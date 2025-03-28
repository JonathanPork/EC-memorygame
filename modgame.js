let words = []; // Word list
let firstCard = null;
let secondCard = null;
let matches = 0;
let lockBoard = false; // Lock board to prevent additional clicks during processing

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
  const card = event.target;

  // Ignore clicks while the board is locked or on already matched cards
  if (lockBoard || card.classList.contains("matched") || card === firstCard) return;

  // Reveal the card
  card.textContent = card.dataset.word;
  card.classList.add("revealed");

  if (!firstCard) {
    // First card clicked
    firstCard = card;
  } else {
    // Second card clicked
    secondCard = card;

    // Lock the board immediately to prevent additional clicks
    lockBoard = true;

    if (firstCard.dataset.word === secondCard.dataset.word) {
      // Match found
      setTimeout(() => {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();

        matches++;
        if (matches === words.length / 2) {
          alert("Congratulations! You matched all pairs!");
        }
      }, 500); // Small delay for smoother visuals
    } else {
      // No match: Hide the cards after a short delay
      setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard.classList.remove("revealed");
        secondCard.classList.remove("revealed");
        resetTurn();
      }, 1000);
    }
  }
}

// Reset game state after each turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false; // Unlock the board for the next turn
}
