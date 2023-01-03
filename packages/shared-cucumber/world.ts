import { IWorldOptions, World as BaseWorld } from "@cucumber/cucumber";
import { AllocationPlugin } from "./allocation";

interface WorldParams {
	region?: string;
}

interface WorldPlugins {
	allocation?: AllocationPlugin;
}

export class World extends BaseWorld<WorldParams> {
	plugins: WorldPlugins;
	constructor(options: IWorldOptions<WorldParams>) {
		super(options);
		console.debug("Initialising empty list of plugins.");
		this.plugins = {};
	}
}
