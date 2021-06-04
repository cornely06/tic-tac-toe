var Gameboard = (function() {
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

Gameboard.reset();