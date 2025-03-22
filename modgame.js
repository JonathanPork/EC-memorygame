let words = []; // Word list
let firstCard = null;
let secondCard = null;
let matches = 0;
let lockBoard = false; // Lock board to prevent extra clicks

// Function to start the game
function startGame() {
  const input = document.getElementById("word-input").value.trim();
  if (!input) {
    alert("Please enter words separated by commas.");
    return;
  }

  // Split the input, trim spaces, and validate
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

  // Clear game board
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  // Generate the game board
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
  if (lockBoard) return; // Stop clicks while board is locked
  const card = event.target;

  // Ignore clicks on already matched cards or the same card
  if (card.classList.contains("matched") || card === firstCard) return;

  // Reveal the card
  card.textContent = card.dataset.word;
  card.classList.add("revealed");

  if (!firstCard) {
    // First card clicked
    firstCard = card;
  } else {
    // Second card clicked
    secondCard = card;

    // Lock the board immediately
    lockBoard = true;

    if (firstCard.dataset.word === secondCard.dataset.word) {
      // Match found
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      resetTurn();

      matches++;
      if (matches === words.length / 2) {
        setTimeout(() => {
          alert("Congratulations! You matched all pairs!");
        }, 500); // Small delay for final match
      }
    } else {
      // No match: Hide the cards after a short delay
      setTimeout(() => {
        firstCard.textContent = "";
        firstCard.classList.remove("revealed");
        secondCard.textContent = "";
        secondCard.classList.remove("revealed");
        resetTurn();
      }, 1000);
    }
  }
}

// Reset the game state after each turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false; // Unlock the board for the next turn
}
