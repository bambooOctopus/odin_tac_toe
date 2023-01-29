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

    const isGameOver = () => {        
        return false

    };

    return {boardArray, newBoard, legalMove, addPiece, isGameOver}
};

//this is a module not a factory
var updateDom = (function () {
    return {
        updateGrid: function(positionId, playerMoniker) {
            let gridDiv = document.getElementById(positionId);
            gridDiv.textContent = playerMoniker;         
        }
    }
})();

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

    const switchPlayers = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        }
        else {
            currentPlayer = playerOne;
        };
    };

    //player turn would run on click
    const playerTurn = (eventTarget) => {
        
        //take click input; verify it's a legal move; update board if so
        let moveId = eventTarget.id.split("-")[1];
        if (gameBoard.legalMove(moveId)) {            
            gameBoard.addPiece(moveId, currentPlayer.getMoniker());
            updateDom.updateGrid(eventTarget.id, currentPlayer.getMoniker());

            //check for game over
            if (gameBoard.isGameOver()) {
                console.log("isgameover")
                //end game is reset board
                gameBoard.newBoard();
                currentPlayer = playerOne;
                console.log(gameBoard.boardArray);
            }
            else {
                console.log("isntgameover")                
                switchPlayers();
            };           

        }
        else {
            return;
        };        
    };

    

    return {playerOne, playerTwo, gameBoard, newGame};
};

let g = gameController();
g.newGame();

