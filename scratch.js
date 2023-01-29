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
    let currentPlayer = playerOne;
    const gameBoard = Board();

    let blocks = document.querySelectorAll(".move");
    blocks.forEach(block => block.addEventListener("click", (event) => {
        console.log(currentPlayer.getMoniker())
            playerTurn(event.target);

    }));



    const newGame = () => {
        //set new gameBoard
        gameBoard.newBoard();
    };

    //player turn would run on click?
    const playerTurn = (eventTarget) => {
        console.log(eventTarget.id.split("-")[1])
        //take click input; verify it's a legal move
        let moveId = eventTarget.id.split("-")[1];
        if (gameBoard.legalMove(moveId)) {            
            gameBoard.addPiece(moveId, currentPlayer.getMoniker());
            console.log(gameBoard.boardArray);
        }
        else {
            return;
        };

        

        //if (currentPlayer === playerOne) {
            //check to see if it's a legal move

            //and if it is make the move (add it to the boardArray; eventually update dom)

            //then check to see if it is game over

            //if it isn't game over switch players 

            //if it is game over end the game
        //}
        //else {

        //};

    };

    

    return {playerOne, playerTwo, gameBoard, newGame};
};

let g = gameController();
g.newGame();

