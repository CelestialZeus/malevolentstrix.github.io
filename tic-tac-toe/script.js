// Global variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let aiPlayer = "O";
let humanPlayer = "X";
let gameInProgress = true;

// DOM elements
const cells = document.querySelectorAll(".cell");

// Event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Functions
function handleCellClick() {
  if (gameInProgress) {
    const cellIndex = parseInt(this.getAttribute("id"));

    if (board[cellIndex] === "") {
      this.classList.add(`marked-${humanPlayer.toLowerCase()}`);
      this.innerText = humanPlayer;
      board[cellIndex] = humanPlayer;

      if (checkWin(humanPlayer)) {
        alert(`${humanPlayer} wins!`);
        gameInProgress = false;
      } else if (checkTie()) {
        alert("It's a tie!");
        gameInProgress = false;
      } else {
        currentPlayer = aiPlayer;
        handleAiTurn();
      }
    }
  }
}

function handleAiTurn() {
  const aiMove = minimax();
  const aiCell = document.getElementById(aiMove.index);

  aiCell.classList.add(`marked-${aiPlayer.toLowerCase()}`);
  aiCell.innerText = aiPlayer;
  board[aiMove.index] = aiPlayer;

  if (checkWin(aiPlayer)) {
    alert(`${aiPlayer} wins!`);
    gameInProgress = false;
  } else if (checkTie()) {
    alert("It's a tie!");
    gameInProgress = false;
  } else {
    currentPlayer = humanPlayer;
  }
}

function checkWin(player) {
  return (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  );
}

function checkTie() {
  return !board.includes("");
}

function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameInProgress = true;

  cells.forEach((cell) => {
    cell.classList.remove("marked-x", "marked-o");
    cell.innerText = "";
  });
}

function minimax(depth, isMaximizingPlayer) {
  const score = calculateScore();

  if (score === 10) {
    return { score };
  } else if (score === -10) {
    return { score };
  } else if (checkTie()) {
    return { score: 0 };
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = aiPlayer;
        const currentScore = minimax(depth + 1, false).score;
        board[i] = "";

        if (currentScore > bestScore) {
          bestScore = currentScore;
          bestMove = i;
        }
      }
    }

    return { score: bestScore, index: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = humanPlayer;
        const currentScore = minimax(depth + 1, true).score;
        board[i] = "";

        if (currentScore < bestScore) {
          bestScore = currentScore;
          bestMove = i;
        }
      }
    }

    return { score: bestScore, index: bestMove };
  }
}

function calculateScore() {
  if (checkWin(aiPlayer)) {
    return 10;
  } else if (checkWin(humanPlayer)) {
    return -10;
  } else {
    return 0;
  }
}
