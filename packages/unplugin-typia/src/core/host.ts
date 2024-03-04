import { normalize } from "path";
import ts from "typescript";

export class LanguageServiceHost implements ts.LanguageServiceHost {

    private snapshots = new Map<string, ts.IScriptSnapshot>();
    private versions = new Map<string, number>();
    private service?: ts.LanguageService;
    private fileNames: Set<string>;

    constructor(private parsedConfig: ts.ParsedCommandLine, private cwd: string) {
        this.fileNames = new Set(parsedConfig.fileNames);
    }

    public reset() {
        this.snapshots.clear();
        this.versions.clear();
    }

    public setLanguageService(service: ts.LanguageService) {
        this.service = service;
    }

    public setScriptSnapshot(fileName: string, source: string) {
        fileName = normalize(fileName);

        const snapshot = ts.ScriptSnapshot.fromString(source);
        this.snapshots.set(fileName, snapshot);
        this.versions.set(fileName, (this.versions.get(fileName) || 0) + 1)
        this.fileNames.add(fileName);

        return snapshot;
    }

    public getScriptSnapshot(fileName: string) {
        fileName = normalize(fileName);

        let snapshot = this.snapshots.get(fileName);
        if (snapshot != undefined) {
            return snapshot;
        }

        const source = ts.sys.readFile(fileName);
        if (source) {
            return this.setScriptSnapshot(fileName, source);
        }

        return undefined;
    }

    public getScriptFileNames() {
        return Array.from(this.fileNames.values());
    }

    public getScriptVersion(fileName: string) {
        fileName = normalize(fileName);

        return (this.versions.get(fileName) || 0).toString();
    }

    public getCompilationSettings = () => this.parsedConfig.options;
    public getTypeRootsVersion = () => 0;
    public getCurrentDirectory = () => this.cwd;

    public useCaseSensitiveFileNames = () => ts.sys.useCaseSensitiveFileNames;
    public getDefaultLibFileName = ts.getDefaultLibFilePath; // confusing naming: https://github.com/microsoft/TypeScript/issues/35318

    public readDirectory = ts.sys.readDirectory;
    public readFile = ts.sys.readFile;
    public fileExists = ts.sys.fileExists;
    public directoryExists = ts.sys.directoryExists;
    public getDirectories = ts.sys.getDirectories;
    public realpath = ts.sys.realpath!; // this exists in the default implementation: https://github.com/microsoft/TypeScript/blob/ab2523bbe0352d4486f67b73473d2143ad64d03d/src/compiler/sys.ts#L1288

    public trace = console.log;
}
