let words = []; // Initialize an empty word list
let firstCard = null;
let secondCard = null;
let matches = 0;
let lockBoard = false; // Lock mechanism to prevent multiple clicks during processing

// Function to start the game
function startGame() {
  const input = document.getElementById("word-input").value.trim();
  if (!input) {
    alert("Please enter at least one word.");
    return;
  }

  // Split the input into an array of words and shuffle
  words = input.split(",").map(word => word.trim());
  if (words.length < 5) {
    alert("Please enter at least 5 unique words.");
    return;
  }

  words = [...words, ...words]; // Duplicate words to create pairs
  words.sort(() => Math.random() - 0.5); // Shuffle the words

  // Reset game variables
  matches = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Clear the game board
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  // Create the game board
  words.forEach((word, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.word = word;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Function to handle card clicks
function flipCard(event) {
  if (lockBoard) return; // Prevent clicks while the board is locked
  const card = event.target;

  // Ignore clicks on already matched cards or the same card twice
  if (card.classList.contains("matched") || card === firstCard) return;

  // Reveal the card
  card.textContent = card.dataset.word;

  if (!firstCard) {
    // First card clicked
    firstCard = card;
  } else {
    // Second card clicked
    secondCard = card;

    // Lock the board to prevent additional clicks
    lockBoard = true;

    if (firstCard.dataset.word === secondCard.dataset.word) {
      // Match found
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches++;
      resetTurn();

      if (matches === words.length / 2) {
        alert("Congratulations! You matched all pairs!");
      }
    } else {
      // No match: hide the cards after a short delay
      setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        resetTurn();
      }, 1000);
    }
  }
}

// Reset cards after each turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false; // Unlock the board for the next turn
}
// Reset cards after each turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
}
