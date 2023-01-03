import { AllocationContext } from "./allocation";

export interface WorldContexts {
	allocation?: AllocationContext;
}

export interface IContextOptions {
	name: string;
	state?: unknown;
}

export class BaseContext {
	name: string;
	state: Record<string, unknown>;

	constructor(options: IContextOptions) {
		this.name = options.name;
		this.state = {};
	}
}
