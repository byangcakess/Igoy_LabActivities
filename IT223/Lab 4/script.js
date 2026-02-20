const emojis = ["🍎","🍎","🚀","🚀","🎮","🎮","🐶","🐶"];
let shuffled = emojis.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const board = document.getElementById("gameBoard");

function createBoard() {
    board.innerHTML = "";
    shuffled = emojis.sort(() => 0.5 - Math.random());
    matches = 0;
    document.getElementById("message").innerText = "";

    shuffled.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.innerHTML = "?";

        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.innerHTML = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        matches++;
        resetTurn();

        if (matches === 4) {
            document.getElementById("message").innerText = "🎉 You Won!";
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restartGame() {
    createBoard();
}

createBoard();