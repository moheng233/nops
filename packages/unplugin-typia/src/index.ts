import ts from "typescript";
import { transform } from "typia/lib/transform.js";
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import { MagicString, compileScript, parse as sfcPaser } from "vue/compiler-sfc";
import { LanguageServiceHost } from "./core/host";
import { paserTsConfig } from "./core/tsconfig";
import type { Options } from './types';
import { createFilter } from "vite";

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options = {}, meta) => {
    options = Object.assign(options, {
        "cwd": process.cwd(),
    });

    const tsconfig = paserTsConfig(options);
    const serviceHost = new LanguageServiceHost(tsconfig.parsedTsConfig, options.cwd ?? process.cwd());
    const documentRegistry = ts.createDocumentRegistry();
    const service = ts.createLanguageService(serviceHost, documentRegistry);
    const printer = ts.createPrinter();

    serviceHost.setLanguageService(service);

    const filter = createFilter(
        options.include || [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/],
        options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    )

    return {
        name: 'unplugin-vue-typia',
        enforce: "pre",
        buildStart() {

        },
        transformInclude(id) {
            return filter(id);
        },
        transform(code, id) {
            const { descriptor: { scriptSetup }, errors } = sfcPaser(code, {});

            if (errors.length == 0 && scriptSetup != null && scriptSetup.lang == "ts") {
                const pre = ts.preProcessFile(scriptSetup.loc.source);
                if (pre.importedFiles.find(v => v.fileName == "typia") != undefined) {
                    const snapshot = serviceHost.setScriptSnapshot(id, scriptSetup.loc.source);
                    const program = service.getProgram()!;

                    const source = program?.getSourceFile(id)!;
                    // const source = ts.createLanguageServiceSourceFile(id, snapshot, ts.ScriptTarget.ESNext, serviceHost.getScriptVersion(id), false);

                    const diagnostics: ts.Diagnostic[] = [];

                    const transformed = ts.transform(source, [
                        transform(program, {}, {
                            addDiagnostic(diag) {
                                return diagnostics.push(diag);
                            },
                        })
                    ], {
                        ...program.getCompilerOptions(),
                        sourceMap: true,
                        inlineSources: true
                    });
                    
                    this.warn(transformed.transformed.map(e => e.fileName).join(","));
                    const file = transformed.transformed.find(t => t.fileName === id)!;

                    for (const diagnostic of diagnostics) {
                        this.warn(JSON.stringify(diagnostic.messageText));
                    }

                    const magic = new MagicString(code);
                    magic.update(scriptSetup.loc.start.offset, scriptSetup.loc.end.offset, ts.sys.newLine + printer.printFile(file) + ts.sys.newLine);

                    transformed.dispose();

                    return {
                        code: magic.toString(),
                        map: magic.generateMap({
                            source: id,
                            file: id + ".map",
                        })
                    };
                }
            }

            return code;
        },
    };
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
