import ts from "typescript";
import type { UnpluginContext, UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import { parse as sfcPaser, compileScript } from "vue/compiler-sfc";
import type { Options } from './types';
import path, { extname, normalize } from "path";
import { transform } from "typia/lib/transform.js";

export function transpileTypia(input: string, context: UnpluginContext, transpileOptions: ts.TranspileOptions): ts.TranspileOutput {
    const diagnostics: ts.Diagnostic[] = [];

    const options: ts.CompilerOptions = transpileOptions.compilerOptions ?? {};

    // mix in default options
    const defaultOptions = ts.getDefaultCompilerOptions();
    for (const key in defaultOptions) {
        if (Object.hasOwn(defaultOptions, key) && options[key] === undefined) {
            options[key] = defaultOptions[key];
        }
    }

    options.strict = true;
    options.suppressOutputPathCheck = true;
    options.allowNonTsExtensions = true;

    const libs = ts.getDefaultLibFileName(options);
    const libPath = ts.getDefaultLibFilePath(options);

    const cache = new Map<string, ts.SourceFile>();

    // Output
    let outputText: string = "";
    let sourceMapText: string | undefined;

    const newLine = ts.sys.newLine;

    // Create a compilerHost object to allow the compiler to read and write files
    const compilerHost: ts.CompilerHost = {
        getSourceFile: fileName => {
            let source: ts.SourceFile | undefined = undefined;

            switch (fileName) {
                case inputFileName:
                    source = sourceFile;
                    break;
                default:
                    if (!path.isAbsolute(fileName)) {
                        fileName = path.resolve(path.dirname(libPath), fileName);
                    }

                    source = cache.get(fileName);
                    if (source === undefined) {
                        const content = ts.sys.readFile(fileName, "utf-8");
                        if (content != undefined) {
                            source = ts.createSourceFile(fileName, content, ts.ScriptTarget.ESNext, undefined, ts.ScriptKind.TS);
                            cache.set(fileName, source);
                        }
                    }
                    break;
            }

            return source;
        },
        writeFile: (name, text) => { },
        getDefaultLibFileName: () => libs,
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: fileName => fileName,
        getCurrentDirectory: process.cwd,
        getNewLine: () => newLine,
        fileExists: (fileName) => {
            if (fileName === inputFileName) {
                return true;
            }

            return ts.sys.fileExists(fileName);
        },
        readFile: (name) => {
            if (name === inputFileName) {
                return input;
            }

            return ts.sys.readFile(name);
        },
        directoryExists: ts.sys.directoryExists,
        getDirectories: ts.sys.getDirectories,
        resolveModuleNameLiterals(literals, file, ref, options, source, reusdNames) {
            for (const iterator of literals) {
                const name = printer.printNode(ts.EmitHint.Expression, iterator, source);
                context.warn(`resolve: ${}`)
                ts.resolveModuleName()
            }

            return [];
        }
    };

    // if jsx is specified then treat file as .tsx
    const inputFileName = transpileOptions.fileName || (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? "module.tsx" : "module.ts");
    const sourceFile = ts.createSourceFile(
        inputFileName,
        input,
        {
            languageVersion: ts.ScriptTarget.ESNext,
            jsDocParsingMode: ts.JSDocParsingMode.ParseAll,
        },
        false,
        ts.ScriptKind.TS
    );
    if (transpileOptions.moduleName) {
        sourceFile.moduleName = transpileOptions.moduleName;
    }

    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed
    }, {
        hasGlobalName: (n) => false,
    });
    const program = ts.createProgram([inputFileName], options, sourceCompilerHost, undefined, diagnostics);

    const result = ts.transform(sourceFile, [transform(program, {}, {
        addDiagnostic(diag) {
            return diagnostics.push(diag);
        },
    })], {
        ...options,
    });

    for (const iterator of result.transformed) {
        if (extname(iterator.fileName) === ".map") {
            // TODO
            sourceMapText = printer.printFile(iterator);
        }
        else {
            // TODO
            outputText = printer.printFile(iterator);
        }
    }

    result.dispose();

    return { outputText, diagnostics: [...diagnostics, ...result.diagnostics ?? []], sourceMapText };
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options = {}) => {
    return {
        name: 'unplugin-vue-typia',
        enforce: "pre",
        buildStart() {

        },
        transformInclude(id) {
            return id.endsWith('.vue');
        },
        transform(code, id) {
            const { descriptor, errors } = sfcPaser(code, {});

            const script = compileScript(descriptor, {
                id
            });

            if (errors.length == 0 && script != null && script.lang == "ts") {
                const { outputText, sourceMapText, diagnostics } = transpileTypia(script.loc.source, this, {
                    fileName: id,
                    compilerOptions: {
                        target: ts.ScriptTarget.ESNext,
                        module: ts.ModuleKind.ESNext,
                    }
                });

                for (const diagnostic of diagnostics ?? []) {
                    this.warn(JSON.stringify(diagnostic.messageText));
                }

                return {
                    code: code.slice(0, script.loc.start.offset) + ts.sys.newLine + outputText + ts.sys.newLine + code.slice(script.loc.end.offset)
                };
            }

            return code;
        },
    };
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
