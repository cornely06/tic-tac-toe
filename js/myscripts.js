const displayBoard = document.querySelector('#gameboard');

const gameboard = (() => {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];
    return { board };
})();

const displayController = (() => {

    const createBoard = () => {
        gameboard.board.forEach(addCells);
    }

    const addCells = (cell, index) => {
        let displayCell = document.createElement('div');
        displayCell.classList.add('cell');
        displayCell.dataset.index = index;
        displayCell.textContent = cell;
        displayCell.addEventListener('mousedown', gameController.makeMove);
        displayBoard.appendChild(displayCell);
    }

    return { createBoard };
})();

const gameController = (() => {
    let piece = 'X';
    let isOver = false;
    let movesMade = 0;
    const newGame = document.querySelector('#newgame');

    const switchPiece = function() {
        if (piece == 'X') {
            piece = 'O';
        } else {piece = 'X'}
    }

    const makeMove = (event) => {
        if (isOver) {return;}
        let thisCell = event.target;
        if (!thisCell.textContent) {
        thisCell.textContent = piece;
        gameboard.board[thisCell.dataset.index] = thisCell.textContent;
        movesMade++;
        }
        else {console.log('error: occupied space'); return;}
        testing();
        switchPiece();
    }

    const reset = () => {
        gameboard.board = gameboard.board.map(toEmpty => toEmpty = "")
        while (displayBoard.firstChild) {displayBoard.firstChild.remove()}
        piece = 'X';
        displayController.createBoard();
        isOver = false;
    }

    const testArr = [[0, 1, 2],
                 [0, 3, 6],
                 [0, 4, 8],
                 [1, 4, 7],
                 [2, 4, 6],
                 [2, 5, 8],
                 [3, 4, 5],
                 [6, 7, 8]];

    const testing = () => testArr.forEach(testCase => {
        if (gameboard.board[testCase[0]] == gameboard.board[testCase[1]] &&
            gameboard.board[testCase[0]] == gameboard.board[testCase[2]] &&
            gameboard.board[testCase[1]] == gameboard.board[testCase[2]] &&
            gameboard.board[testCase[0]] !== "") {
                isOver = true;
                console.log(`player ${piece} wins!`)
            }
        if (movesMade == 9) {isOver = true; console.log('tie')}
    })

    newGame.addEventListener('mousedown', reset);

    return { makeMove };
})();

displayController.createBoard();