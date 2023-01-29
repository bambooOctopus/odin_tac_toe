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

const updateDom = (positionId, playerMoniker) => {
    let gridDiv = document.getElementById(positionId);
    gridDiv.textContent = playerMoniker;

};

const clearDom = () => {
    let gridDiv = document.querySelectorAll(".move");
    gridDiv.forEach(div => div.textContent = "");
};

const gameOver = (boardArray) => {
    let playerOneMoniker = "x";
    let playerTwoMoniker = "o";

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

};

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
    let stopGame = false;

    if (stopGame === true) {
        console.log(`the winner is ${currentPlayer.getName}`);
        return;        
    }

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
            updateDom(target.id, currentPlayer.getMoniker);  
            
            if (gameOver(b.boardArray) === true) {
                alert(`the game is over. the winner is ${currentPlayer.getName}`); 
                if (confirm("would you like to play again?")) {
                    b.boardArray = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
                    console.log("this board array here ");
                     console.log(b.boardArray);
                    clearDom();
                    currentPlayer = playerOne;
                    stopGame = false;
                };               
            }
            else {
                switchPlayer();
            }
            
        }
        else {            
            return
        }

        

    };

    const changeStopGame = () => {
        if (stopGame === false) {
            console.log(stopGame);
            stopGame = true;
            console.log(stopGame);
        }
    };
    

    

    return {currentPlayer, switchPlayer, possibleMove};
};

let game = newGame();






