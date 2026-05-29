const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let playerX = 350;
let score = 0;
let timeLeft = 30;
let gameRunning = false;

const goodItems = ["🌱", "🍎", "🌽"];
const badItems = ["🗑️", "☠️"];

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  }

  if (e.key === "ArrowRight" && playerX < 740) {
    playerX += 20;
  }

  player.style.left = playerX + "px";
});

function createItem() {
  const item = document.createElement("div");
  item.classList.add("item");

  const isGood = Math.random() > 0.3;

  item.textContent = isGood
    ? goodItems[Math.floor(Math.random() * goodItems.length)]
    : badItems[Math.floor(Math.random() * badItems.length)];

  item.dataset.good = isGood;

  const x = Math.random() * 760;
  item.style.left = x + "px";

  gameArea.appendChild(item);

  let y = 0;

  const fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      item.remove();
      return;
    }

    y += 5;
    item.style.top = y + "px";

    const itemRect = item.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      itemRect.bottom >= playerRect.top &&
      itemRect.left < playerRect.right &&
      itemRect.right > playerRect.left
    ) {
      if (item.dataset.good === "true") {
        score += 10;
      } else {
        score -= 5;
      }

      scoreDisplay.textContent = score;
      clearInterval(fall);
      item.remove();
    }

    if (y > 400) {
      clearInterval(fall);
      item.remove();
    }
  }, 30);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  gameRunning = true;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  const gameInterval = setInterval(() => {
    createItem();
  }, 800);

  const timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(gameInterval);
      gameRunning = false;

      alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (!gameRunning) {
    startGame();
  }
});
