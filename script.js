//board module
const gameBoard = (function () {
    let boardArray = [];
    

    // making the initial board all hypens will make it easier to check if the position is
    // taken or not.
    for (i=0; i < 9; i++) {
        boardArray.push("-");
    }

    const addPiece = piece => {
        boardArray.push(piece);
        console.log(boardArray);
        
    };
        
    return {addPiece, boardArray};

});

const Player = (name, moniker) => {
    const getName = name;
    const getMoniker = moniker;

    return {getName, getMoniker};

};

// var Game = () => {
//     let b = gameBoard
//     let playerOne = Player("Player 1", "x");
//     let playerTwo = Player("Player 2", "o");
//     let currentPlayer = null;

//     const newGame = () => {
//         currentPlayer = playerOne;
//     };

//     const switchPlayer = () => {
//         if (currentPlayer == playerOne) {
//             console.log("player 1 if");            
//             this.currentPlayer = playerTwo;
            
//         }
//         else {
//             console.log("player 1 else");
//             currentPlayer = playerOne;
//         }
//     };
    

//     const hello = () => {
//         console.log("hello world");
//     }

//     return {hello, switchPlayer, currentPlayer, newGame};
    
// };

const newGame = () => {
    const b = gameBoard();
    console.log(b);

    let blocks = document.querySelectorAll(".move");
    blocks.forEach(block => block.addEventListener("click", (event) => {
        game.possibleMove(event.target);
    }));
    

    const playerOne = Player("Player 1", "x");
    const playerTwo = Player("Player 2", "o");
    let currentPlayer = playerOne;

    const switchPlayer = () => {
        console.log("before conditional: " + currentPlayer.getMoniker)
        if (currentPlayer === playerOne) {
            b.addPiece(currentPlayer.getMoniker);
            console.log("if");
            console.log("this " + this)
            currentPlayer = playerTwo;
        }
        else {
            console.log("else");
            b.addPiece(currentPlayer.getMoniker);
            currentPlayer = playerOne;
        }
    };

    const player = () => {
        console.log("current player after switch " + currentPlayer.getMoniker);
    };

    const possibleMove = target => {
        let move = target.id.split("-")[1];

        if (b.boardArray[move] != "-") {
            return
        }
        else {
            b.boardArray.splice(move, 1, currentPlayer.getMoniker);
            console.log(b.boardArray);
        }

    };
    

    

    return {currentPlayer, switchPlayer, player, possibleMove};
};

let game = newGame();



// let blocks = document.querySelectorAll(".move");
// blocks.forEach(block => block.addEventListener("click", logButton(block)));


// game.switchPlayer();
// game.player();
// game.switchPlayer();
// game.player();

// let b = gameBoard;
// b.addPiece("x");

// let blocks = document.querySelectorAll(".move");
// blocks.forEach(block => block.addEventListener("click", (event) => {
//     game.possibleMove(event.target);
// }));

// function logButton(block) {
//    console.log(block.id)
// };






