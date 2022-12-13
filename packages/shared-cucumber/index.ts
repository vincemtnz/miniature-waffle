import { IWorld, Then, When } from "@cucumber/cucumber";
import assert from "node:assert";

When<IWorld>("I set foo to bar", function () {
	this.parameters.foo = "bar";
});

Then<IWorld>("I expect foo to be bar", function () {
	assert.equal(this.parameters.foo, "bar");
});
