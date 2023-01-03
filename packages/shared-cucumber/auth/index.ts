import { Before, Given, Then } from "@cucumber/cucumber";
import assert from "node:assert";
import { randomUUID } from "node:crypto";
import { BaseContext } from "../contexts";
import { World } from "../world";
import { faker } from "@faker-js/faker";

interface User {
	id: string;
	name: string;
	email: string;
}
interface InternalUser extends User {
	roles: string[];
}

export class AuthContext extends BaseContext {
	internalUsers: Map<string, InternalUser>;
	members: Map<string, User>;
	constructor() {
		super({ name: "auth" });
		this.internalUsers = new Map<string, InternalUser>();
		this.members = new Map<string, User>();
	}

	createInternalUser(options: Omit<InternalUser, "id">) {
		const id = randomUUID();
		const user = { id, ...options };
		this.internalUsers.set(user.name, user);
		return user;
	}

	createMember(options: Omit<User, "id">) {
		const id = randomUUID();
		const user = { id, ...options };
		this.members.set(options.name, user);
		return user;
	}

	findMemberByEmail(email: string) {
		Array.from(this.members, ([_id, user]) => user).find(
			(member) => member.email === email,
		) ?? null;
	}

	findInternalUserByEmail(email: string) {
		Array.from(this.internalUsers, ([_id, user]) => user).find(
			(user) => user.email === email,
		) ?? null;
	}
}

Before<World>(function () {
	this.ctx.auth = new AuthContext();
});

Given<World>(
	"user {string} has role {string}",
	function (name: string, role: string) {
		const user = this.ctx.auth?.createInternalUser({
			name,
			roles: [role],
			email: `${name}+${role}@domain.com`,
		});

		assert(user);
	},
);

Given<World>("there is a member called {string}", function (name: string) {
	const member = this.ctx.auth?.createMember({
		name,
		email: faker.internet.email(...name.split(" ")),
	});

	assert(member);
});

Then<World>("member {string} should have an email", function (name: string) {
	assert(this.ctx.auth);
	assert(this.ctx.auth.members.get(name)?.email != null);
});

Then<World>("user {string} should have an email", function (name: string) {
	assert(this.ctx.auth);
	assert(this.ctx.auth.internalUsers.get(name)?.email != null);
});
