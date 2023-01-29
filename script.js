//board module
var gameBoard = (function () {
    boardArray = [];

    //making the initial board all hypens will make it easier to check if the position is
    //taken or not.
    // for (i=0; i < 9; i++) {
    //     boardArray.push("-");
    // }

    const addPiece = piece => {
        boardArray.push(piece);
        console.log(boardArray);
        
    };
        
    return {addPiece};

})();

var Player = (name, moniker) => {
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
    let b = gameBoard;
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
        console.log("current player after switch " + currentPlayer.getMoniker)
    };

    

    return {currentPlayer, switchPlayer, player};
};

// let game = newGame();
// game.switchPlayer();
// game.player();
// game.switchPlayer();
// game.player();

// let b = gameBoard;
// b.addPiece("x");

let blocks = document.querySelectorAll(".move");
blocks.forEach(block => block.addEventListener("click", logButton));

function logButton() {
    console.log(this.id);
}



