

// const game = () => {

//     let currentPlayer = "1";

//     const hello = () => "hello world";

//     const switchPlayer = () => {
//         if (currentPlayer === "1") {
//             currentPlayer = "2";
            
//             console.log("if");
//             console.log(currentPlayer);
            
//         }
//         else {
//             console.log("else");
//         }

//         console.log("blah blah blah " + currentPlayer)
//     }

    

//     return {hello, switchPlayer, currentPlayer};

// };



// console.log(game.hello);



const personFactory = (name, age) => {
    const sayHello = () => console.log("hello world");
    const changeAge = () => {
        age = 55;
        
    };

    const printAge = () => {
        console.log(age);

    };

    

    return {name, age, sayHello, changeAge, printAge};
};

let b = personFactory("bill", 34);
b.changeAge();
b.printAge();
console.log(b.age);
b.printAge();