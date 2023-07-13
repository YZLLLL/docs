// 实现一个简单的html-webpack-plugin

// declare class Compiler {
// 	constructor(context: string, options?: WebpackOptionsNormalized);
// 	hooks: Readonly<{
// 		initialize: SyncHook<[]>;
// 		shouldEmit: SyncBailHook<[Compilation], undefined | boolean>;
// 		done: AsyncSeriesHook<[Stats]>;
// 		afterDone: SyncHook<[Stats]>;
// 		additionalPass: AsyncSeriesHook<[]>;
// 		beforeRun: AsyncSeriesHook<[Compiler]>;
// 		run: AsyncSeriesHook<[Compiler]>;
// 		emit: AsyncSeriesHook<[Compilation]>;
// 		assetEmitted: AsyncSeriesHook<[string, AssetEmittedInfo]>;
// 		afterEmit: AsyncSeriesHook<[Compilation]>;
// 		thisCompilation: SyncHook<[Compilation, CompilationParams]>;
// 		compilation: SyncHook<[Compilation, CompilationParams]>;
// 		normalModuleFactory: SyncHook<[NormalModuleFactory]>;
// 		contextModuleFactory: SyncHook<[ContextModuleFactory]>;
// 		beforeCompile: AsyncSeriesHook<[CompilationParams]>;
// 		compile: SyncHook<[CompilationParams]>;
// 		make: AsyncParallelHook<[Compilation]>;
// 		finishMake: AsyncParallelHook<[Compilation]>;
// 		afterCompile: AsyncSeriesHook<[Compilation]>;
// 		readRecords: AsyncSeriesHook<[]>;
// 		emitRecords: AsyncSeriesHook<[]>;
// 		watchRun: AsyncSeriesHook<[Compiler]>;
// 		failed: SyncHook<[Error]>;
// 		invalid: SyncHook<[null | string, number]>;
// 		watchClose: SyncHook<[]>;
// 		shutdown: AsyncSeriesHook<[]>;
// 		infrastructureLog: SyncBailHook<[string, string, any[]], true>;
// 		environment: SyncHook<[]>;
// 		afterEnvironment: SyncHook<[]>;
// 		afterPlugins: SyncHook<[Compiler]>;
// 		afterResolvers: SyncHook<[Compiler]>;
// 		entryOption: SyncBailHook<[string, EntryNormalized], boolean>;
// 	}>;
// 	webpack: typeof exports;
// 	name?: string;
// 	parentCompilation?: Compilation;
// 	root: Compiler;
// 	outputPath: string;
// 	watching?: Watching;
// 	outputFileSystem: OutputFileSystem;
// 	intermediateFileSystem: IntermediateFileSystem;
// 	inputFileSystem: InputFileSystem;
// 	watchFileSystem: WatchFileSystem;
// 	recordsInputPath: null | string;
// 	recordsOutputPath: null | string;
// 	records: object;
// 	managedPaths: Set<string | RegExp>;
// 	immutablePaths: Set<string | RegExp>;
// 	modifiedFiles?: ReadonlySet<string>;
// 	removedFiles?: ReadonlySet<string>;
// 	fileTimestamps?: ReadonlyMap<string, null | FileSystemInfoEntry | "ignore">;
// 	contextTimestamps?: ReadonlyMap<
// 		string,
// 		null | FileSystemInfoEntry | "ignore"
// 	>;
// 	fsStartTime?: number;
// 	resolverFactory: ResolverFactory;
// 	infrastructureLogger: any;
// 	options: WebpackOptionsNormalized;
// 	context: string;
// 	requestShortener: RequestShortener;
// 	cache: Cache;
// 	moduleMemCaches?: Map<
// 		Module,
// 		{
// 			buildInfo: object;
// 			references: WeakMap<Dependency, Module>;
// 			memCache: WeakTupleMap<any, any>;
// 		}
// 	>;
// 	compilerPath: string;
// 	running: boolean;
// 	idle: boolean;
// 	watchMode: boolean;
// 	getCache(name: string): CacheFacade;
// 	getInfrastructureLogger(name: string | (() => string)): WebpackLogger;
// 	watch(watchOptions: WatchOptions, handler: CallbackFunction<Stats>): Watching;
// 	run(callback: CallbackFunction<Stats>): void;
// 	runAsChild(
// 		callback: (
// 			err?: null | Error,
// 			entries?: Chunk[],
// 			compilation?: Compilation
// 		) => any
// 	): void;
// 	purgeInputFileSystem(): void;
// 	emitAssets(compilation: Compilation, callback: CallbackFunction<void>): void;
// 	emitRecords(callback: CallbackFunction<void>): void;
// 	readRecords(callback: CallbackFunction<void>): void;
// 	createChildCompiler(
// 		compilation: Compilation,
// 		compilerName: string,
// 		compilerIndex: number,
// 		outputOptions?: OutputNormalized,
// 		plugins?: WebpackPluginInstance[]
// 	): Compiler;
// 	isChild(): boolean;
// 	createCompilation(params?: any): Compilation;
// 	newCompilation(params: CompilationParams): Compilation;
// 	createNormalModuleFactory(): NormalModuleFactory;
// 	createContextModuleFactory(): ContextModuleFactory;
// 	newCompilationParams(): {
// 		normalModuleFactory: NormalModuleFactory;
// 		contextModuleFactory: ContextModuleFactory;
// 	};
// 	compile(callback: CallbackFunction<Compilation>): void;
// 	close(callback: CallbackFunction<void>): void;
// }

import { Compiler } from 'webpack/types'

const fs = require('fs');
const path = require('path');

type options = {
  title: string,
  template: string,
  filename: string,
}
type compilation = {
  assets: string[]
}

class HtmlWebpackPlugin {
  constructor(public options: options) {}
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync("HtmlWebpackPlugin", (compilation, callback) => {
      const { template, filename } = this.options;
      fs.readFile(template, 'utf8', (err: Error, data: string) => {
        if (err) {
          return callback(err);
        }
        const html = this.replacePlaceholders(data, compilation)
      })
    })
  }
  replacePlaceholders(html: string, compilation: any): string {
    const { assets } = compilation;

    // Replace the template placeholders with actual values
    // 替换标题
    let replacedHtml = html.replace(/{{\s*title\s*}}/g, this.options.title || '');
    // 替换js
    replacedHtml = replacedHtml.replace(/{{\s*script\s*}}/g, this.getScriptTag(assets));
    // 替换css
    replacedHtml = replacedHtml.replace(/{{\s*style\s*}}/g, this.getStyleTag(assets));

    return replacedHtml;
  }
  getScriptTag(assets: any):string {
    return ''
  }
  getStyleTag(assets: any):string {
    return ''
  }
}

module.exports = HtmlWebpackPlugin;
