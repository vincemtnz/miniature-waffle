import { Before, Given, Then } from "@cucumber/cucumber";
import assert from "node:assert";
import { randomUUID } from "node:crypto";
import { BaseContext } from "../context";
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
	state: {
		internalUsers: Map<string, InternalUser>;
		members: Map<string, User>;
	};

	constructor() {
		super({ name: "auth" });
		this.state = {
			internalUsers: new Map<string, InternalUser>(),
			members: new Map<string, User>(),
		};
	}

	createInternalUser(options: Omit<InternalUser, "id">) {
		const id = randomUUID();
		const user = { id, ...options };
		this.state.internalUsers.set(user.name, user);
		return user;
	}

	createMember(options: Omit<User, "id">) {
		const id = randomUUID();
		const user = { id, ...options };
		this.state.members.set(options.name, user);
		return user;
	}

	findMemberByEmail(email: string) {
		Array.from(this.state.members, ([_id, user]) => user).find(
			(member) => member.email === email,
		) ?? null;
	}

	findInternalUserByEmail(email: string) {
		Array.from(this.state.internalUsers, ([_id, user]) => user).find(
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
			email: faker.internet.email(...name.split(" ")),
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
	this.ctx.auth?.state.members.set(member.name, member);
});

Then<World>("member {string} should have an email", function (name: string) {
	assert(this.ctx.auth?.state.members.get(name)?.email != null);
});

Then<World>("user {string} should have an email", function (name: string) {
	assert(this.ctx.auth?.state.internalUsers.get(name)?.email != null);
});
