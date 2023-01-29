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
        const playerOneMoniker = "x"
        const playerTwoMoniker = "o"
        const allEqual = arr => arr.every( v => v === playerOneMoniker || v === playerTwoMoniker);

        let row1 = [boardArray[0], boardArray[1], boardArray[2]];
        let row2 = [boardArray[3], boardArray[4], boardArray[5]];
        let row3 = [boardArray[6], boardArray[7], boardArray[8]];
        
        let column1 = [boardArray[0], boardArray[3], boardArray[6]];
        let column2 = [boardArray[1], boardArray[4], boardArray[7]];
        let column3 = [boardArray[2], boardArray[5], boardArray[8]];
        
        let diag1 = [boardArray[0], boardArray[4], boardArray[8]];
        let diag2 = [boardArray[2], boardArray[4], boardArray[6]];       

        if (allEqual(row1) || allEqual(row2) || allEqual(row3)) {
            return true;
        }
        else if (allEqual(column1) || allEqual(column2) || allEqual(column3)) {
            return true;
        }
        else if (allEqual(diag1) || allEqual(diag2)) {
            return true;
        }
        else {
            return false;
        };       

    };

    return {boardArray, newBoard, legalMove, addPiece, isGameOver}
};

//this is a module not a factory
var updateDom = (function () {
    return {
        updateGrid: function(positionId, playerMoniker) {
            let gridDiv = document.getElementById(positionId);
            gridDiv.textContent = playerMoniker;         
        },

        clearScreen: function() {
            let gridDiv = document.querySelectorAll(".move");
            gridDiv.forEach(div => div.textContent = "");
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
                updateDom.clearScreen();               
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

