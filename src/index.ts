// import { User } from "./models/User";
// import { UserEdit } from "./views/UserEdit";


// const user = User.buildUser({ name: 'Max', age: 10 });
// const form = new UserEdit(document.getElementById('root')!, user);
// form.render();

import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";

import { User, UserProps } from "./models/User";

const collection = new Collection<User, UserProps>(
    'http://localhost:3000/users',
    (json:UserProps) => User.buildUser(json)
);
const parent = document.querySelector('#root')!;
collection.on('change', () => {
    new UserList(parent, collection).render();
})
collection.fetch();