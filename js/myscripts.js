const Gameboard = (() => {
    let piece = 'X';

    const switchPiece = function() {
        if (piece == 'X') {
            piece = 'O';
        } else {piece = 'X'}
    }

    const setChoice = function(e) {
        if (!e.target.textContent) {
            e.target.textContent = piece;
        } else {
            console.log('error: occupied space');
        }
        switchPiece();
    }

    const reset = function() {
        let gameboard = document.querySelector('#gameboard')
        while (gameboard.firstChild) {
            gameboard.removeChild(gameboard.lastChild);
        }
        for (let i = 1; i <= 9; i++) {
            let cell = document.createElement('div');
            cell.dataset.index = i;
            cell.classList.add('cell');
            cell.addEventListener('mousedown', setChoice);
            gameboard.appendChild(cell);
        }
        piece = 'X';
    };
    return { reset };
})();

const displayController = (() => {
    let newGame = document.querySelector('#newgame');
    newGame.addEventListener('mousedown', Gameboard.reset);
})();

Gameboard.reset();