//board module
const gameBoard = (function () {
    let boardArray = [];
    

    // making the initial board all hypens will make it easier to check if the position is
    // taken or not.
    for (i=0; i < 9; i++) {
        boardArray.push("-");
    }

    const addPiece = (piece, position) => {
        boardArray.splice(position, 1, piece);
        console.log(boardArray);
        
    };

    const legalMove = arrayPosition => {
        if (boardArray[arrayPosition] != "-") {
            return false;    
        }
        else {
            return true;
        }
    };
        
    return {addPiece, boardArray, legalMove};

});

const Player = (name, moniker) => {
    const getName = name;
    const getMoniker = moniker;

    return {getName, getMoniker};

};


const newGame = () => {
    const b = gameBoard();
    

    let blocks = document.querySelectorAll(".move");
    blocks.forEach(block => block.addEventListener("click", (event) => {
        game.possibleMove(event.target);
    }));
    

    const playerOne = Player("Player 1", "x");
    const playerTwo = Player("Player 2", "o");
    let currentPlayer = playerOne;

    const switchPlayer = () => {
        
        if (currentPlayer === playerOne) {            
            currentPlayer = playerTwo;
        }
        else {           
            currentPlayer = playerOne;
        }
    };  

    const possibleMove = target => {
        let arrayPosition = target.id.split("-")[1];

        if (b.legalMove(arrayPosition)) {
            b.addPiece(currentPlayer.getMoniker, arrayPosition);
            switchPlayer();
        }
        else {            
            return
        }

    };
    

    

    return {currentPlayer, switchPlayer, possibleMove};
};

let game = newGame();



