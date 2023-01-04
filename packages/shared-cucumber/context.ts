export interface IContextOptions {
	name: string;
	state?: unknown;
}

export class BaseContext {
	name: string;
	state: Map<string, unknown>;

	constructor(options: IContextOptions) {
		this.name = options.name;
		this.state = new Map();
	}

	save<T>(key: string, data: T) {
		this.state.set(key, data);
	}

	read(key: string) {
		if (this.state.has(key)) return this.state.get(key);
		else
			throw new Error(
				`You tried to read ${key}, but it does not exist in this context.`,
			);
	}
}
