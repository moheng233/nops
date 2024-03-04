import { dirname } from "path";
import ts from "typescript";
import { Options } from "../types";
import { getOptionsOverrides } from "./options_overrides";

export function paserTsConfig(pluginOption: Options) {
    const fileName = ts.findConfigFile(pluginOption.cwd ?? process.cwd(), ts.sys.fileExists, pluginOption.tsconfig);

    // if the value was provided, but no file, fail hard
    // if (pluginOption.tsconfig !== undefined && !fileName)
    //     context.error(`failed to open '${pluginOption.tsconfig}'`);

    let loadedConfig: any = {};
    let baseDir = pluginOption.cwd ?? process.cwd();
    let configFileName;
    let pretty = true;
    if (fileName) {
        const text = ts.sys.readFile(fileName)!; // readFile only returns undefined when the file doesn't exist, which we already checked above
        const result = ts.parseConfigFileTextToJson(fileName, text);
        pretty = result.config?.pretty ?? pretty;

        // if (result.error !== undefined) {
        //     // ts.printDiagnostics(context, convertDiagnostic("config", [result.error]), pretty);
        //     context.error(`failed to parse '${fileName}'`);
        // }

        loadedConfig = result.config;
        baseDir = dirname(fileName);
        configFileName = fileName;
    }

    const defaultOptions = ts.getDefaultCompilerOptions();
    for (const key in defaultOptions) {
        if (Object.hasOwn(defaultOptions, key) && loadedConfig[key] === undefined) {
            loadedConfig[key] = defaultOptions[key];
        }
    }

    const parsedTsConfig = ts.parseJsonConfigFileContent(loadedConfig, ts.sys, baseDir, getOptionsOverrides(pluginOption, loadedConfig), configFileName);

    const module = parsedTsConfig.options.module!;
    // if (module !== ts.ModuleKind.ES2015 && module !== ts.ModuleKind.ES2020 && module !== ts.ModuleKind.ES2022 && module !== ts.ModuleKind.ESNext)
    //     context.error(`Incompatible tsconfig option. Module resolves to '${ts.ModuleKind[module]}'. This is incompatible with Rollup, please use 'module: "ES2015"', 'module: "ES2020"', 'module: "ES2022"', or 'module: "ESNext"'.`);

    // printDiagnostics(context, convertDiagnostic("config", parsedTsConfig.errors), pretty);

    // context.warn(`built-in options overrides: ${JSON.stringify({}, undefined, 4)}`);
    // context.warn(`parsed tsconfig: ${JSON.stringify(parsedTsConfig, undefined, 4)}`);

    return { parsedTsConfig, fileName };
}
