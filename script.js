//new script.js


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
        let boardArrayLength = boardArray.length
        for (i=0; i < boardArrayLength; i++) {
            boardArray.pop();
        }
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
        const playerOneWin = arr => arr.every( v => v == playerOneMoniker);
        const playerTwoWin = arr => arr.every( v => v == playerTwoMoniker);


        let row1 = [boardArray[0], boardArray[1], boardArray[2]];
        let row2 = [boardArray[3], boardArray[4], boardArray[5]];
        let row3 = [boardArray[6], boardArray[7], boardArray[8]];
        
        let column1 = [boardArray[0], boardArray[3], boardArray[6]];
        let column2 = [boardArray[1], boardArray[4], boardArray[7]];
        let column3 = [boardArray[2], boardArray[5], boardArray[8]];
        
        let diag1 = [boardArray[0], boardArray[4], boardArray[8]];
        let diag2 = [boardArray[2], boardArray[4], boardArray[6]];       

        console.log("boardArray from isGameOver: " + boardArray)

        if (playerOneWin(row1) || playerOneWin(row2) || playerOneWin(row3)) {
            return true;
        }
        else if (playerOneWin(column1) || playerOneWin(column2) || playerOneWin(column3)) {
            return true;
        }
        else if (playerOneWin(diag1) || playerOneWin(diag2)) {
            return true;
        }

        else if (playerTwoWin(row1) || playerTwoWin(row2) || playerTwoWin(row3)) {
            return true;
        }
        else if (playerTwoWin(column1) || playerTwoWin(column2) || playerTwoWin(column3)) {
            return true;
        }
        else if (playerTwoWin(diag1) || playerTwoWin(diag2)) {
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

    let resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", (event) => {
        newGame();
    });

    const newGame = () => {
        //set new gameBoard
        gameBoard.newBoard(); 
        updateDom.clearScreen();
        currentPlayer = playerOne;
    };

    const switchPlayers = () => {
        const body = document.getElementById("body");
        console.log(body);
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
            console.log(gameBoard.boardArray)

            //check for game over
            if (gameBoard.isGameOver()) {
                console.log("isgameover")                
                //end game is reset board
                alert(`Game Over. ${currentPlayer.getName()} is victorious!`);
                
                newGame()              
                
                return                     
                

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

