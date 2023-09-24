// سرعة   الفرق بين تحديث كل فريم والتانى للشاشه هى سرعة الثعبان فى اللعبه ةعشان اتحكم فيه كل 2
import {
  SNAKE_SPEED,
  upDate as upDateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { upDate as upDateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
// عاوز اعمل الفرق بين الزمينين
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currnetTime) {
  if (gameOver) {
    if (confirm("You Lost. Press Ok Restart")) {
      window.location = "/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currnetTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  console.log("render");
  // console.log(secondsSinceLastRender);
  lastRenderTime = currnetTime;
  upDate();
  draw();
}
window.requestAnimationFrame(main);

function upDate() {
  upDateSnake();
  upDateFood();
  chackDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
let but = document.querySelector("button");
let cont = document.querySelector(".cont");
cont.style.display = "none";

but.onclick = function (e) {
  if (cont.style.display === "none" || cont.style.display === "") {
    cont.style.display = "block";
    but.textContent = "End Game";
  } else {
    cont.style.display = "none";
    but.textContent = "Start Game";
    setTimeout(function () {
      window.location = "/";
    }, 2000);
  }
};

function chackDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
