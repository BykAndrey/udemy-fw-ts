import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
    template(): string {
        return `
            <div>
            <h1>Details</h1>
            <div> User name:\t${this.model.get('name')}</div>
            <div> User age:\t${this.model.get('age')}</div>

            </div>
        `
    }
    
}