import { DeviceLogProviderBase } from "./device-log-provider-base";
import { DEVICE_LOG_EVENT_NAME } from "../constants";
import { LoggerConfigData } from "../../constants";

export class DeviceLogProvider extends DeviceLogProviderBase {
	constructor(protected $logFilter: Mobile.ILogFilter,
		protected $logger: ILogger) {
		super($logFilter, $logger);
	}

	public logData(lineText: string, platform: string, deviceIdentifier: string): void {
		const loggingOptions = this.getDeviceLogOptionsForDevice(deviceIdentifier);
		const data = this.$logFilter.filterData(platform, lineText, loggingOptions);
		if (data) {
			this.logDataCore(data);
			this.emit(DEVICE_LOG_EVENT_NAME, lineText, deviceIdentifier, platform);
		}
	}

	public setLogLevel(logLevel: string, deviceIdentifier?: string): void {
		this.$logFilter.loggingLevel = logLevel.toUpperCase();
	}

	private logDataCore(data: string): void {
		this.$logger.info(data, { [LoggerConfigData.skipNewLine]: true });
	}
}
$injector.register("deviceLogProvider", DeviceLogProvider);
