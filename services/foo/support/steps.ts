import { IWorld, Then } from "@cucumber/cucumber";
import assert from "node:assert";


Then<IWorld>("I expect foo to be bar in my local scope too", function () {
	assert.equal(this.parameters.foo, "bar");
});