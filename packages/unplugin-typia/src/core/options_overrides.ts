import path, { normalize } from "path";
import ts from "typescript";
import { Options } from "../types";

export function getOptionsOverrides({ cacheRoot }: Options, preParsedTsconfig?: ts.ParsedCommandLine): ts.CompilerOptions {
    const overrides: ts.CompilerOptions = {
        noEmitHelpers: false,
        importHelpers: true,
        noResolve: false,
        noEmit: false,
        noEmitOnError: false,
        inlineSourceMap: false,
        sourceMap: true,
        outDir: normalize(`${cacheRoot}/placeholder`), // need an outdir that is different from source or tsconfig parsing trips up. https://github.com/Microsoft/TypeScript/issues/24715
        allowNonTsExtensions: true,
    };

    // if (!preParsedTsconfig)
    //     return overrides;
    // if (preParsedTsconfig.options.moduleResolution === ts.ModuleResolutionKind.Classic)
    //     overrides.moduleResolution = ts.ModuleResolutionKind.Node10;
    // if (preParsedTsconfig.options.module === undefined)
    //     overrides.module = ts.ModuleKind.ES2015;

    // only set declarationDir if useTsconfigDeclarationDir is enabled
    // if (!useTsconfigDeclarationDir)
    //     overrides.declarationDir = undefined;

    // unsetting sourceRoot if sourceMap is not enabled (in case original tsconfig had inlineSourceMap set that is being unset and would cause TS5051)
    // const sourceMap = preParsedTsconfig.options.sourceMap;
    // if (!sourceMap)
    //     overrides.sourceRoot = undefined;

    return overrides;
}

function expandIncludeWithDirs(include: string | string[], dirs: string[]) {
    const newDirs: string[] = [];

    dirs.forEach(root => {
        if (include instanceof Array)
            include.forEach(x => newDirs.push(normalize(path.join(root, x))));
        else
            newDirs.push(normalize(path.join(root, include)));
    });
    return newDirs;
}

// export function createFilter(context: UnpluginContext, pluginOptions: Options, parsedConfig: ts.ParsedCommandLine) {
//     let included = pluginOptions.include ?? [];
//     let excluded = pluginOptions.exclude ?? [];

//     if (parsedConfig.options.rootDirs) {
//         included = expandIncludeWithDirs(included, parsedConfig.options.rootDirs);
//         excluded = expandIncludeWithDirs(excluded, parsedConfig.options.rootDirs);
//     }

//     if (parsedConfig.projectReferences) {
//         included = expandIncludeWithDirs(included, parsedConfig.projectReferences.map((x) => x.path)).concat(included);
//         excluded = expandIncludeWithDirs(excluded, parsedConfig.projectReferences.map((x) => x.path)).concat(excluded);
//     }

//     // context.debug(() => `included:\n${JSON.stringify(included, undefined, 4)}`);
//     // context.debug(() => `excluded:\n${JSON.stringify(excluded, undefined, 4)}`);
//     return createRollupFilter(included, excluded, { resolve: parsedConfig.options.rootDir });
// }
