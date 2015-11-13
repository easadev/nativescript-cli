interface IPluginsService {
	add(plugin: string): IFuture<void>; // adds plugin by name, github url, local path and et.
	remove(pluginName: string): IFuture<void>; // removes plugin only by name
	prepare(pluginData: IDependencyData, platform: string): IFuture<void>;
	getAllInstalledPlugins(): IFuture<IPluginData[]>;
	ensureAllDependenciesAreInstalled(): IFuture<void>;
	afterPrepareAllPlugins(): IFuture<void>;
	/**
	 * Installs all devDependencies of the project.
	 * In case all of them are already installed, no operation will be executed.
	 * In case any of them is missing, all of them will be installed.
	 * @return {IFuture<void>}
	 */
	installDevDependencies(): IFuture<void>;
}

interface IPluginData extends INodeModuleData {
	platformsData: IPluginPlatformsData;
	/* Gets all plugin variables from plugin */
	pluginVariables: IDictionary<IPluginVariableData>;
	pluginPlatformsFolderPath(platform: string): string;
}

interface INodeModuleData {
	name: string;
	version: string;
	fullPath: string;
	isPlugin: boolean;
	moduleInfo: any;
}

interface IPluginPlatformsData {
	ios: string;
	android: string;
}

interface IPluginVariablesService {
	/**
	 * Saves plugin variables in project package.json file.
	 * @param  {IPluginData}		pluginData for the plugin.
	 * @return {IFuture<void>}
	 */
	savePluginVariablesInProjectFile(pluginData: IPluginData): IFuture<void>;
	/**
	 * Removes plugin variables from project package.json file.
	 * @param  {IPluginData}		pluginData for the plugin.
	 * @return {IFuture<void>}
	 */
	removePluginVariablesFromProjectFile(pluginData: IPluginData): IFuture<void>;
	/**
	 * Replaces all plugin variables with their corresponding values.
	 * @param {IPluginData}		pluginData for the plugin.
	 * @param {pluginConfigurationFileContent}		pluginConfigurationFileContent for the plugin.
	 * @return {IFuture<string>}		returns the changed plugin configuration file content.
	 */
	interpolatePluginVariables(pluginData: IPluginData, pluginConfigurationFileContent: string): IFuture<string>;
	/**
	 * Returns the
	 * @param {IPluginData}		pluginData for the plugin.
	 * @return {IFuture<string>}		returns the changed plugin configuration file content.
	 */
	getPluginVariablePropertyName(pluginData: IPluginData): string;

}

interface IPluginVariableData {
	defaultValue?: string;
	name?: string;
	value?: string;
}