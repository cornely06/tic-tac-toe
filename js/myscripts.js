var Gameboard = (function() {
    const emptyBoard = function() {
        let gameboard = document.querySelector('#gameboard')
        for (let i = 1; i <= 9; i++) {
            let cell = document.createElement('div');
            cell.dataset.index = i;
            cell.classList.add('cell');
            gameboard.appendChild(cell);
        }
    };
    return { emptyBoard };
})();

Gameboard.emptyBoard();