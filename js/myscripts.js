const gameboard = (() => {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];
    return { board };
})();

const displayController = (() => {
    const displayBoard = document.querySelector('#gameboard');
    const newGame = document.querySelector('#newgame');

    const createBoard = () => {
        gameboard.board.forEach(addCells);
    }

    const makeMove = (event) => {
        let thisCell = event.target;
        if (!thisCell.textContent) {
        thisCell.textContent = gameController.piece;
        gameboard.board[thisCell.dataset.index] = thisCell.textContent;
        gameController.switchPiece();
        }
        else {console.log('error: occupied space')}
    }

    const addCells = (cell, index) => {
        let displayCell = document.createElement('div');
        displayCell.classList.add('cell');
        displayCell.dataset.index = index;
        displayCell.textContent = cell;
        displayCell.addEventListener('mousedown', makeMove);
        displayBoard.appendChild(displayCell);
    }

    const reset = () => {
        gameboard.board = gameboard.board.map(cell => cell = "")
        while (displayBoard.firstChild) {displayBoard.firstChild.remove()}
        gameController.piece = 'X';
        createBoard();
    }

    newGame.addEventListener('mousedown', reset);

    return { createBoard };
})();

const gameController = (() => {
    let piece = 'X';

    const switchPiece = function() {
        if (gameController.piece == 'X') {
            gameController.piece = 'O';
        } else {gameController.piece = 'X'}
    }

    return { piece, switchPiece};
})();

displayController.createBoard();