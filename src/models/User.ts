interface UserProps {
	name?: string;
	age?: number;
}

type Callback = () => {};

export class User {
	private events: { [key: string]: Callback[] } = {};
	constructor(private data: UserProps) {}
	get(propName: string): string | number {
		return this.data[propName];
	}
	set(update: UserProps): void {
		Object.assign(this.data, update);
	}
	on(eventName: string, callback: Callback): void {}
	trigger() {}
}
