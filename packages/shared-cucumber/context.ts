export interface IContextOptions {
	name: string;
	state?: unknown;
}

export class BaseContext {
	name: string;
	state: unknown;

	constructor(options: IContextOptions) {
		this.name = options.name;
		this.state = {};
	}
}
