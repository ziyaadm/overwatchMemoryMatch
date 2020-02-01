const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let attempts = 0;
let accuracy = 0;
let matches = 0;
let max_matches = 2;
let games_played = 0;

function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  hasFlippedCard = false;

  attempts++
  checkForMatch();
  calculateAccuracy();
}

 function checkForMatch() {
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
     matches++;
     disableCards();
     return;
   }
   unflipCards();
 }

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];

  [firstCard, secondCard] = [null, null];
}


 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);

     card.style.order = ramdomPos;
   });
 })();

function calculateAccuracy() {
   accuracy = Math.floor((matches / attempts) * 100) + "%";
   displayStats();
   checkForWin();
 }
function displayStats() {
  document.querySelector(".playedNum").textContent = games_played;
  document.querySelector(".attemptNum").textContent = attempts;
  document.querySelector(".accuracyNum").textContent = accuracy;
}
function checkForWin(){
  if (matches === max_matches) {
    games_played++;
    displayStats();
    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector(".resetButton").addEventListener("click", resetStats);
  }
}
function unFlipAll(){
  var remaining = document.getElementsByClassName("flip");
  while (remaining.length) remaining[0].classList.remove("flip");
}
function resetStats() {
  matches = 0;
  attempts = 0;
  accuracy = 0 + "%";
  games_played++;
  document.querySelector(".modal").classList.add("hidden");
  displayStats();
  unflipCards();
  resetBoard();
  unFlipAll();
}

cards.forEach(card => card.addEventListener("click", flipCard));
