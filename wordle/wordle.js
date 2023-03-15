const squares = document.querySelectorAll('.board-square');
const len = 5;
const ROUNDS = 6;

async function init() {
  const word = await getWordOfTheDay();
  let guess = '';
  let round = 0;
  let done = false;

  document.addEventListener('keydown', function handleKeyPress(event) {
    if (done) {
      return;
    }

    const action = event.key;

    if (action === 'Enter') {
      checkans();
    }

    if (action === 'Backspace') {
      backspace();
    }

    if (checkifletter(action)) {
      insertchar(action);
    }
  });

  function insertchar(letter) {
    if (guess.length < len) {
      squares[round * len + guess.length].innerText = letter;
      guess += letter.toLowerCase();
    }
  }

  function backspace() {
    guess = guess.slice(0, -1);
    // remove letter from correct sqaure
    squares[round * len + guess.length].innerText = '';
  }

  async function checkans() {
    if (guess.length === len) {
      if (!(await isValid(guess))) {
        flash();
        return;
      }

      wordMap = makeMap(word);
      markWord();

      if (guess === word) {
        done = true;
        alert('You win! Congrats!');
        return;
      }

      round++;
      guess = '';
      wordMap = makeMap(word);

      if (round === ROUNDS) {
        done = true;
        alert(`You lost! The word of the day was ${word.toUpperCase()}.`);
      }
    }
  }

  async function isValid(guess) {

    const res = await fetch('https://words.dev-apis.com/validate-word', {
      method: 'POST',
      body: JSON.stringify({ word: guess }),
    });
    const { validWord } = await res.json();
    return validWord;
  }

  async function getWordOfTheDay() {
    const res = await fetch('https://words.dev-apis.com/word-of-the-day');
    const { word } = await res.json();
    return word;
  }

  function flash() {
    for (let i = 0; i < len; i++) {
      squares[round * len + i].classList.remove('error');
    }
    setTimeout(function addClass() {
      for (let i = 0; i < len; i++) {
        squares[round * len + i].classList.add('error');
      }
    }, 10);
  }

  function markWord() {
    for (let i = 0; i < len; i++) {
      if (guess.charAt(i) === word.charAt(i)) {
        wordMap[guess.charAt(i)]--;
        markCorrect(i);
      } else if (
        word.includes(guess.charAt(i)) &&
        wordMap[guess.charAt(i)] > 0
      ) {
        wordMap[guess.charAt(i)]--;
        markClose(i);
      } else {
        markWrong(i);
      }
    }
  }

  function markCorrect(position) {
    squares[round * len + position].classList.add('correct');
  }

  function markClose(position) {
    squares[round * len + position].classList.add('close');
  }

  function markWrong(position) {
    squares[round * len + position].classList.add('wrong');
  }
}

function checkifletter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function makeMap(word) {
  obj = {};
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) in obj) {
      obj[word.charAt(i)]++;
      continue;
    }
    obj[word.charAt(i)] = 1;
  }
  return obj;
}

init();