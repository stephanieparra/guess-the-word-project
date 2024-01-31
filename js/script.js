//Global Variables//
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//Tester word//
const word = "magnolia";

//Display placeholder symbols for the tester word's letters//
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

//Event listener for guess button//
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const personsGuess = letterInput.value;
  console.log(personsGuess);
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
