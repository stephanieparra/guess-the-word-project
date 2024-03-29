//Global Variables//
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//Tester word//
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//Fire off game//
getWord();

//Display placeholder symbols for the tester word's letters//
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

//Event listener for guess button//
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Empty message paragraph//
  message.innerText = "";
  //Grab what was entered in the input//
  const guess = letterInput.value;
  //Make sure it's a single letter//
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }

  letterInput.value = "";
});

//Function to validate input//
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  //Check if input is empty//
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
    //More than one letter typed//
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
    //A non-letter has been typed//
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A-Z.";
  } else {
    //Finally got a single letter//
    return input;
  }
};

//Function to capture input//
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter. Try again!";
  } else {
    guessedLetters.push(guess);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

//Function to show guessed letters//
const showGuessedLetters = function () {
  //Clear the list first//
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

//Function to update word in progress//
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

//Function to count guesses remaining//
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    //bad guess - lose a chance//
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}!`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

//Function to check if the player won//
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

//Function to hide & show elements and start game over//
const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  //Reset all original values - grab new word//
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  //Grab a new word//
  getWord();

  //Show the right UI elements//
  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
