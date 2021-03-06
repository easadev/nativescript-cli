import * as helpers from "../common/helpers";

export class ListPlatformsCommand implements ICommand {
	public allowedParameters: ICommandParameter[] = [];

	constructor(private $platformService: IPlatformService,
		private $projectData: IProjectData,
		private $logger: ILogger) {
			this.$projectData.initializeProjectData();
		}

	public async execute(args: string[]): Promise<void> {
		const installedPlatforms = this.$platformService.getInstalledPlatforms(this.$projectData);

		if (installedPlatforms.length > 0) {
			const preparedPlatforms = this.$platformService.getPreparedPlatforms(this.$projectData);
			if (preparedPlatforms.length > 0) {
				this.$logger.info("The project is prepared for: ", helpers.formatListOfNames(preparedPlatforms, "and"));
			} else {
				this.$logger.info("The project is not prepared for any platform");
			}

			this.$logger.info("Installed platforms: ", helpers.formatListOfNames(installedPlatforms, "and"));
		} else {
			const formattedPlatformsList = helpers.formatListOfNames(this.$platformService.getAvailablePlatforms(this.$projectData), "and");
			this.$logger.info("Available platforms for this OS: ", formattedPlatformsList);
			this.$logger.info("No installed platforms found. Use $ tns platform add");
		}
	}
}

$injector.registerCommand("platform|*list", ListPlatformsCommand);
