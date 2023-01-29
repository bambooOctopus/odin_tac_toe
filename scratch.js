const Player = (name, moniker) => {    
    const getName = () => {
        return name;
    };    

    const getMoniker = () => {
        return moniker;
    };

    return {getName, getMoniker};
};

const Board = () => {
    let boardArray = [];

    const newBoard = () => {
        for (i=0; i < 9; i++) {
            boardArray.push("-");
        };
    };

    const legalMove = (position) => {
        if (boardArray[position] === "-") {
            return true;
        }
        else {
            return false;
        }
    };

    const addPiece = (position, playerMoniker) => {
        if (boardArray[position] === "-") {
            boardArray.splice(position, 1, playerMoniker);
        }
        else {
            return "invalid move";
        }
    };

    return {boardArray, newBoard, legalMove, addPiece}
};

const gameController = () => {
    const playerOne = Player("Player One", "x");
    const playerTwo = Player("Player Two", "o");
    const gameBoard = Board();

    const newGame = () => {
        //set new gameBoard
        gameBoard.newBoard();
    };

    

    return {playerOne, playerTwo, gameBoard, newGame};
};

let g = gameController();
g.newGame();
console.log(g.gameBoard.boardArray);
g.gameBoard.addPiece(6, "x");
console.log(g.gameBoard.boardArray);
