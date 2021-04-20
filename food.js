import { onSnake, expandSnake } from './snake.js'

let food = randomPos()
const expansionRate = 1

export function update() {
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomPos()
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomPos() {
    let newPos

    while (newPos == null || onSnake(newPos)) {
        newPos = randomPos()
    }

    return newPos
}

function randomPos() {
    return {
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1
    }
}