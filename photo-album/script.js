const cells = document.querySelectorAll("img");


cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});