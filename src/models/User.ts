import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Model } from "./Model";
import { Collection } from "./Collection";
export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}
const rootUrl = 'http://localhost:3000/users';
export class User extends Model<UserProps> {
	static buildUser(data: UserProps): User {
		return new User(
			new Attributes<UserProps>(data),
			new ApiSync<UserProps>(rootUrl),
			new Eventing()
		)
	}
	static buildCollection(): Collection<User, UserProps> {
		return new Collection<User, UserProps>(
			rootUrl,
			(value) => {
				return User.buildUser(value);
			}
		);
	}

	setRandomAge():void {
		this.set({
			age: Math.round(Math.random() * 100)
		})
	}
}


