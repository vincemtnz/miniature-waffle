import { Before, Then, setWorldConstructor } from "@cucumber/cucumber";
import assert from "node:assert";
import { World } from "@yolo/shared-cucumber/world";

setWorldConstructor(World);

Before<World>({ name: "foo" }, function () {});

Then<World>("I should be able to see allocation from here too", function () {
	assert.equal(this.ctx.allocation?.foo, true);
});
