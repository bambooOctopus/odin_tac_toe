//board module
var gameBoard = (function () {
    boardArray = [];

    //making the initial board all hypens will make it easier to check if the position is
    //taken or not.
    for (i=0; i < 9; i++) {
        boardArray.push("-");
    }
        
    return {
        
        board: function() {
            console.log(boardArray);
        }
    }

})();

var Player = (name, moniker) => {
    const getName = name;
    const getMoniker = moniker;

    return {getName, getMoniker};

};


gameBoard.board();





