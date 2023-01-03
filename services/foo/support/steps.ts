import { Before, Then, setWorldConstructor } from "@cucumber/cucumber";
import assert from "node:assert";
import { World } from "@yolo/shared-cucumber/world";

Before<World>({ name: "foo" }, function (ctx) {
	console.log("Before 'foo'");
});

console.log("setting world constructor in foo");
setWorldConstructor(World);

Then<World>("I should be able to see allocation from here too", function () {
	assert.equal(this.plugins.allocation?.foo, true);
});
