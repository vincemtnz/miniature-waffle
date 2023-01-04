import assert from "node:assert";
import { Before, Then } from "@cucumber/cucumber";
import { BaseContext } from "../context";
import { Contexts, World } from "../world";

interface IAllocationContextOptions {
	allicationfoo?: boolean;
	allocationbar?: string;
}

interface IAllocationWorld extends World {
	ctx: Contexts & { allocation: AllocationContext };
}

export class AllocationContext extends BaseContext {
	foo?: boolean;
	bar?: string;
	constructor(options: IAllocationContextOptions) {
		super({ name: "allocation", ...options });
		if (options.allicationfoo) {
			this.foo = options.allicationfoo;
		}
		if (options.allocationbar) {
			this.bar = options.allocationbar;
		}
	}

	anAllocationMethod(param: string) {
		return `Param: ${param}`;
	}
}

Before<World>(function () {
	this.ctx.allocation = new AllocationContext({
		allicationfoo: true,
		allocationbar: "Hello world from Allocation",
	});
});

Then<IAllocationWorld>("allocation bar should be set", function () {
	assert.equal(this.ctx.allocation.bar, "Hello world from Allocation");
});

Then<IAllocationWorld>("allocation foo should be true", function () {
	assert.equal(this.ctx.allocation.foo, true);
});

Then<IAllocationWorld>("allocation method should do something", function () {
	assert.equal(this.ctx.allocation.anAllocationMethod("foo"), "Param: foo");
	this.ctx.allocation.anAllocationMethod("hello");
});
