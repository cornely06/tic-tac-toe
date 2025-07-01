const Gameboard = (function () {
  const array = resetGameBoard();
  return { array };
})();

function threeXThree(array) {
  for (let i = 0; i < 3; i++) {
    console.log(array[i]);
  }
}
function winCheck(array, piece) {
  if ([array[0][0], array[0][1], array[0][2]].every((e) => e === piece)) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[1][0], array[1][1], array[1][2]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[2][0], array[2][1], array[2][2]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[0][0], array[1][0], array[2][0]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[0][1], array[1][1], array[2][1]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[0][2], array[1][2], array[2][2]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[0][0], array[1][1], array[2][2]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  } else if (
    [array[0][2], array[1][1], array[2][0]].every((e) => e === piece)
  ) {
    console.log("winner");
    Gameboard.array = resetGameBoard();
  }
}

const gameController = function () {
  let currentPlayer1 = true;
  return function (x, y) {
    if (Gameboard.array[x][y] !== " ") {
      console.log("Choice already filled. Pick another.");
      return;
    }
    Gameboard.array[x][y] = currentPlayer1 ? "X" : "O";
    currentPlayer1 = !currentPlayer1;
    console.log(threeXThree(Gameboard.array));
    winCheck(Gameboard.array, "X");
    winCheck(Gameboard.array, "O");
  };
};

console.log(threeXThree(Gameboard.array));
const game = gameController();
game(0, 0);
game(2, 1);
game(1, 1);
game(0, 2);
game(2, 2);

function resetGameBoard() {
  return [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
}

console.log(threeXThree(Gameboard.array));
