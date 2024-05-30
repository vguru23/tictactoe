//gameboard object

const gameboard = (function() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = null;
    }

    return {board};

})();


const gameController = (function(player1name = 'player 1', player2name = 'player 2') {
    
    //assigning players
    const players = [{name: player1name, symbol: 'o', won: false}, {name: player2name, symbol: 'x', won:false}];
    //assigning active player
    let activePlayer = players[0];
    console.log(activePlayer);

    //switching active player
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
      };

    const getActivePlayer = () => activePlayer;

    //new board for each turn
    const printTurn = () => {
        const turnHeader = document.getElementById('playerTurn');
        turnHeader.innerText = `it is ${getActivePlayer().name}'s turn (${getActivePlayer().symbol}).`;
        console.log(`it is ${getActivePlayer().name}'s turn.`);
    }


    return {getActivePlayer, printTurn, switchPlayer}
})();


function checkRows() {
    const board = gameboard.board;

    // Win if 0, 1, 2 are all the same, 3, 4, 5 are all the same, or 6, 7, 8 are all the same
    if (board[0] === 'o' && board[0] === board[1] && board[0] === board[2]) {
        return 1;
    } else if (board[0] === 'x' && board[0] === board[1] && board[0] === board[2]) {
        return 1;
    } else if (board[3] === 'o' && board[3] === board[4] && board[3] === board[5]) {
        return 1;
    } else if (board[3] === 'x' && board[3] === board[4] && board[3] === board[5]) {
        return 1;
    } else if (board[6] === 'o' && board[6] === board[7] && board[6] === board[8]) {
        return 1;
    } else if (board[6] === 'x' && board[6] === board[7] && board[6] === board[8]) {
        return 1;
    } 

    return 0;
}


function checkColumns() {
    const board = gameboard.board;
    //win if 0,3,6 or 1,4,7 or 2,5,8
    if (board[0] === 'o' && board[0] === board[3] && board[3] === board[6]) {
        return 1;
    } else if (board[0] === 'x' && board[0] === board[3] && board[3] === board[6]) {
        return 1;
    } else if (board[1] === 'o' && board[1] === board[4] && board[4] === board[7]) {
        return 1;
    } else if (board[1] === 'x' && board[1] === board[4] && board[4] === board[7]) {
        return 1;
    } else if (board[2] === 'o' && board[2] === board[5] && board[5] === board[8]) {
        return 1;
    } else if (board[2] === 'x' && board[2] === board[5] && board[5] === board[8]) {
        return 1;
    } 
    
    return 0;
}

function checkDiagonal() {
    const board = gameboard.board;
    // Win if 0, 4, 8 or 2, 4, 6

    if (board[0] === 'o' && board[0] === board[4] && board[0] === board[8]) {
        return 1;
    } else if (board[0] === 'x' && board[0] === board[4] && board[0] === board[8]) {
        return 1;
    } else if (board[2] === 'o' && board[2] === board[4] && board[2] === board[6]) {
        return 1;
    } else if (board[2] === 'x' && board[2] === board[4] && board[2] === board[6]) {
        return 1;
    } else {
        return 0;
    }
}

function checkTie() {
    const board = gameboard.board;
    for (let i = 0; i < 9; i++) {
        if (board[i] == null) {
            return false;
        }
    }
    return true;
}

function domManipulation(gameController) {
    const turnHeader = document.getElementById('playerTurn');
    turnHeader.innerText = `it is ${gameController.getActivePlayer().name}'s turn (${gameController.getActivePlayer().symbol}).`;
    const gridItems = document.querySelectorAll('.grid-item');
    const board = gameboard.board;
    
    gridItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        console.log(index);
        if (board[index] == null) {
            console.log(board[index]);
            item.innerText = gameController.getActivePlayer().symbol;
            board[index] = gameController.getActivePlayer().symbol;
            

            if (checkColumns() == 1 || checkDiagonal() == 1 || checkRows() == 1) {
                gameController.getActivePlayer().won = true;
                gameOver(gameController);
                console.log(`${gameController.getActivePlayer().name} won!`);
            } 

            if (checkTie()) {
                gameOver(gameController);
            }

            gameController.switchPlayer();
            gameController.printTurn();
        }
      });
    });  
}

function gameOver(gameController) {
    const dialog = document.querySelector("dialog");
    const closeButton = document.getElementById("closeButton");
    const winner = document.getElementById("winnerAnnouncement");

    //state who wins or ties
    if (gameController.getActivePlayer().won) {
        winner.innerText = `${gameController.getActivePlayer().name} won!`;
    } else {
        winner.innerText = 'It is a tie';
    }
    
    dialog.showModal();

    closeButton.addEventListener("click", () => {
        dialog.close();
        location.reload();
      });
}

domManipulation(gameController);