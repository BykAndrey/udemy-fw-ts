import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";


const user = User.buildUser({ name: 'Max', age: 10 });
const form = new UserEdit(document.getElementById('root')!, user);
form.render();