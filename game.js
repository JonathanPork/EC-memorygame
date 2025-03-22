// Words for the game (customizable)
const words = ["Apple", "Dog", "Sun", "Tree", "Sky", "Apple", "Dog", "Sun", "Tree", "Sky"];
words.sort(() => Math.random() - 0.5); // Shuffle the words

// Variables for game state
let firstCard = null;
let secondCard = null;
let matches = 0;

// Create the game board
const gameBoard = document.getElementById("game-board");
words.forEach((word, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.word = word;
  card.dataset.index = index;
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

// Function to handle card clicks
function flipCard(event) {
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

    if (firstCard.dataset.word === secondCard.dataset.word) {
      // Match found
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches++;
      if (matches === words.length / 2) {
        alert("Congratulations! You matched all pairs!");
      }
      resetTurn();
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
}