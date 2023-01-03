import { BasePlugin, IPluginOptions, WorldPlugins } from "../plugin";
import { Before, Then } from "@cucumber/cucumber";
import { World } from "../world";
import assert from "node:assert";

interface IAllocationPluginOptions extends IPluginOptions {
	allicationfoo?: boolean;
	allocationbar?: string;
}

interface IAllocationWorld extends World {
	plugins: WorldPlugins & { allocation: AllocationPlugin };
}

export class AllocationPlugin extends BasePlugin {
	foo?: boolean;
	bar?: string;
	constructor(options: IAllocationPluginOptions) {
		super(options);
		if (options.allicationfoo) {
			console.log("Configuring allocation with foo enabled");
			this.foo = options.allicationfoo;
		}
		if (options.allocationbar) {
			console.log({ allocationbar: options.allocationbar });
			this.bar = options.allocationbar;
		}
	}

	anAllocationMethod(param: string) {
		return `Param: ${param}`;
	}
}

Before<World>(function () {
	this.plugins.allocation = new AllocationPlugin({
		ctx: this,
		allicationfoo: true,
		allocationbar: "Hello world from Allocation",
	});
});

Then<IAllocationWorld>("allocation bar should be set", function () {
	assert.equal(this.plugins.allocation.bar, "Hello world from Allocation");
});

Then<IAllocationWorld>("allocation foo should be true", function () {
	assert.equal(this.plugins.allocation.foo, true);
});

Then<IAllocationWorld>("allocation method should do something", function () {
	assert.equal(this.plugins.allocation.anAllocationMethod("foo"), "Param: foo");
});
