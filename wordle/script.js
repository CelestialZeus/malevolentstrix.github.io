const wordList = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE', 'ORANGE', 'PEAR', 'PINEAPPLE', 'WATERMELON'];
let word, guesses;

function newWord() {
  word = wordList[Math.floor(Math.random() * wordList.length)];
  guesses = Array(word.length).fill(null);

  const wordEl = document.querySelector('.word');
  wordEl.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const letterEl = document.createElement('div');
    letterEl.classList.add('letter');
    wordEl.appendChild(letterEl);
  }
}

function displayGuesses() {
  const guessesEl = document.querySelector('.guesses');
  guessesEl.innerHTML = '';
  for (let i = 0; i < guesses.length; i++) {
    const guessEl = document.createElement('div');
    guessEl.classList.add('guess');
    if (guesses[i] === word[i]) {
      guessEl.classList.add('correct');
    } else if (guesses[i] !== null) {
      guessEl.classList.add('incorrect');
    }
    guessEl.innerHTML = guesses[i] || '';
    guessesEl.appendChild(guessEl);
  }
}

function checkGuess(guess) {
  let found = false;
  for (let i = 0; i < word.length; i++) {
    if (guess === word[i]) {
      guesses[i] = guess;
      found = true;
    }
  }
  return found;
}

function getHint() {
  const hintEl = document.querySelector('.hint');
  hintEl.innerHTML = '';
  const hintLetters = [];
  for (let i = 0; i < word.length; i++) {
    if (guesses[i] === null) {
      hintLetters.push(word[i]);
    }
  }
  const hint = hintLetters[Math.floor(Math.random() * hintLetters.length)];
  hintEl.innerHTML = `Hint: ${hint}`;
}

function gameOver() {
  alert(`Game over! The word was ${word}.`);
  newGame();
}

function newGame() {
  newWord();
  displayGuesses();
  getHint();
}

document.addEventListener('DOMContentLoaded', () => {
  newGame();

  const guessInput = document.querySelector('#guess-input');
  const guessBtn = document.querySelector('#guess-btn');

  guessBtn.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = '';
    if (guess.length !== word.length) {
      alert(`Please enter a word with ${word.length} letters.`);
    } else if (guess === word) {
      alert('You win!');
      newGame();
    } else {
      const correct = checkGuess(guess);
      displayGuesses();
      if (!correct) {
        alert('Incorrect guess!');
      }
      if (guesses.every((g) => g !== null)) {
        alert('You win!');
        newGame();
      } else {
        getHint();
      }
    }
  });
});
