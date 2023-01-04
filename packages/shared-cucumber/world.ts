import { IWorldOptions, World as BaseWorld } from "@cucumber/cucumber";
import { AllocationContext } from "./allocation";
import { AuthContext } from "./auth";

interface WorldParams {
	region?: string;
}

export interface Contexts {
	allocation?: AllocationContext;
	auth?: AuthContext;
}

export class World extends BaseWorld<WorldParams> {
	ctx: Contexts;
	constructor(options: IWorldOptions<WorldParams>) {
		super(options);
		this.ctx = {};
	}
}
