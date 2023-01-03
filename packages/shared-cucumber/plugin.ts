import { AllocationPlugin } from "./allocation";
import { World } from "./world";

export interface WorldPlugins {
	shared?: AllocationPlugin;
}

export interface IPluginOptions {
	ctx: World;
	state?: unknown;
}

export class BasePlugin {
	ctx: World;

	constructor(options: IPluginOptions) {
		this.ctx = options.ctx;
	}
}
