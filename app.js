// Get DOM elements
const cells = document.querySelectorAll(".cell");
const turn = document.getElementById("turn");
const resetButton = document.getElementById("reset");

// Initialize game state
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Set up event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

// Handle cell click events
function handleCellClick() {
  const cellIndex = Array.from(cells).indexOf(this);
  if (gameBoard[cellIndex] !== "" || checkWin()) {
    return;
  }
  gameBoard[cellIndex] = currentPlayer;
  this.textContent = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turn.textContent = `It's ${currentPlayer}'s turn`;
  const winner = checkWin();
  if (winner) {
    if (winner === "draw") {
      turn.textContent = "It's a draw!";
    } else {
      turn.textContent = `${winner} is the winner!`;
    }
  }
}

// Check if a player has won or if it's a draw
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return gameBoard[a];
    }
  }
  if (gameBoard.every((cell) => cell !== "")) {
    return "draw";
  }
  return null;
}

// Reset the game board and clear any winner message
function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  turn.textContent = `It's ${currentPlayer}'s turn`;
}
