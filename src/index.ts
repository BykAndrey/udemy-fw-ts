import { User } from './models/User'

const user = new User({ name: 'a', age: 20 })

console.log(user.get('name'))
console.log(user.get('age'))

user.set({ name: 'b', age: 30 })

console.log(user.get('name'))
console.log(user.get('age'))
