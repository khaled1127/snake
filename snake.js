import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10;
// وهنا انا برسم شكل الثعبان بتاعى عنى طريق محور افقى وراسى بستخدم الجريد بتاعى 21 *21
const snakeBody = [{ x: 11, y: 11 }];

let newSegments = 0;

export function upDate() {
  addSegments();
  let inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach(function (semgent) {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = semgent.x;
    snakeElement.style.gridRowStart = semgent.y;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}
export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignorHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignorHead && index === 0) return false;
    return equalpositions(segment, position);
  });
}
export function getSnakeHead() {
  return snakeBody[0];
}
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignorHead: true });
}
function equalpositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
