import { onSnake, expandSnake } from "./snake.js";
import { randomGridposition } from "./grid.js";
let food = getRandomFooodPosition();
const EXPANSION_REAT = 5;

export function upDate() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_REAT);
    food = getRandomFooodPosition();
  }
}

export function draw(gameBoard) {
  const footElement = document.createElement("div");
  footElement.style.gridColumnStart = food.x;
  footElement.style.gridRowStart = food.y;
  footElement.classList.add("food");
  gameBoard.appendChild(footElement);
}

function getRandomFooodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridposition();
  }
  return newFoodPosition;
}
