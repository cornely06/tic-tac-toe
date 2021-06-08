

const gameboard = (() => {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];
    return { board };
})();

const displayController = (() => {
    const displayBoard = document.querySelector('#gameboard');
    const display = document.querySelector('#display');
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');

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

    player1.addEventListener('input', () => {
        if (gameController.piece == 'X') {
            if (player1.value) {display.textContent = `${player1.value}'s turn`;}
            else {display.textContent = `${player1.placeholder}'s turn`;}
        }
    })

    player2.addEventListener('input', () => {
        if (gameController.piece == 'O') {
            if (player2.value) {display.textContent = `${player2.value}'s turn`;}
            else {display.textContent = `${player2.placeholder}'s turn`;}
        }
    })

    const updateDisplay = () => {
        if (gameController.piece == 'X') {
            if (player1.value) {
                display.textContent = `${player1.value}'s turn`;
            }
            else {display.textContent = `${player1.placeholder}'s turn`;}
        } else if (gameController.piece == 'O') {
            if (player2.value) {
                display.textContent = `${player2.value}'s turn`;
            }
            else {display.textContent = `${player2.placeholder}'s turn`;}
        }
    }

    const showWinner = () => {
        if (gameController.piece == 'X') {
            if (player1.value) {
                display.textContent = `${player1.value} wins!`
            }
            else {display.textContent = `${player1.placeholder} wins!`}
        } else if (gameController.piece == 'O') {
            if (player2.value) {
                display.textContent = `${player2.value} wins!`
            }
            else {display.textContent = `${player2.placeholder} wins!`}
        }
    }

    const firstMove = () => {
        display.textContent = (() => {return player1.value ? `${player1.value}'s turn` : `${player1.placeholder}'s turn`})();
    }

    return { displayBoard, display, createBoard, updateDisplay, showWinner, firstMove };
})();

const gameController = (() => {
    let piece = 'X';
    let isOver = false;
    let movesMade = 0;
    const newGame = document.querySelector('#newgame');

    const switchPiece = function() {
        if (isOver) {return;}
        if (gameController.piece == 'X') {
            gameController.piece = 'O';
        } else {gameController.piece = 'X'}
        displayController.updateDisplay();
    }

    const makeMove = (event) => {
        if (isOver) {return;}
        let thisCell = event.target;
        if (!thisCell.textContent) {
        thisCell.textContent = gameController.piece;
        gameboard.board[thisCell.dataset.index] = thisCell.textContent;
        movesMade++;
        }
        else {console.log('error: occupied space'); return;}
        testing();
        switchPiece();
    }

    const reset = () => {
        gameboard.board = gameboard.board.map(toEmpty => toEmpty = "")
        while (displayController.displayBoard.firstChild) {
            displayController.displayBoard.firstChild.remove()
        }
        gameController.piece = 'X';
        displayController.createBoard();
        isOver = false;
        movesMade = 0;
        displayController.firstMove();
    }

    const testArr = [[0, 1, 2],
                 [0, 3, 6],
                 [0, 4, 8],
                 [1, 4, 7],
                 [2, 4, 6],
                 [2, 5, 8],
                 [3, 4, 5],
                 [6, 7, 8]];

    const testing = () => {testArr.forEach(testCase => {
        if (gameboard.board[testCase[0]] == gameboard.board[testCase[1]] &&
            gameboard.board[testCase[0]] == gameboard.board[testCase[2]] &&
            gameboard.board[testCase[1]] == gameboard.board[testCase[2]] &&
            gameboard.board[testCase[0]] !== "") {
                isOver = true;
                document.querySelector(`.cell[data-index="${testCase[0]}"]`).classList.add('winner');
                document.querySelector(`.cell[data-index="${testCase[1]}"]`).classList.add('winner');
                document.querySelector(`.cell[data-index="${testCase[2]}"]`).classList.add('winner');
                displayController.showWinner();
                movesMade = 0;
                gameController.piece = '';
            }
    }); if (movesMade == 9) {
        isOver = true;
        displayController.display.textContent = 'game is tied!';
        gameController.piece = '';
    }}

    newGame.addEventListener('mousedown', reset);

    return { piece, makeMove };
})();

displayController.createBoard();