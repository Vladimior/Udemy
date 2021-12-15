// User.prototype.exit = function (name) {
//     console.log(`Пользователь ${this.name} ушел`);
// };
//
// const pety = new User('Pety', 14);
// const ivan = new User('Ivan', 34);
//
// console.log(pety);
// console.log(ivan);
// ivan.exit();
// pety.hello();
// ivan.hello();

// Обычная функция: this = window, но если strict - undefined
// function showThis(a, b) {
//     function sum() {
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }
// showThis(4, 4);
//
// const obl = {
//     a: 20,
//     b: 32,
//     sum() {
//         console.log(this);
//     },
// };
// obl.sum();
//
// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function () {
//         console.log(`Hello ${this.name}`);
//     };
// }

// function sayName() {
//     console.log(this);
//     console.log(this.name);
// }
//
// const user = {
//     name: 'Ura',
// };
//
// sayName.call(user);
// sayName.apply(user);

// const log = function (a, b, c, ...rest) {
//     console.log(a, b, rest);
// };
//
// log('bas', 'sdfsdf','dsfsdfsd', 'sdfsfsfdsd', 'sdfsdfsdfsdfsfdsdf');
