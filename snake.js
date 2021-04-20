import { getInputDir } from './input.js'

export let snakeSpeed = 5
const snake = [ {x: 11, y: 11} ]
let newSegment = 0
let score = 0
let scoreIncrement = 1

export function update() {
    addSegment()
    const inputDir = getInputDir()
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] }
    }

    snake[0].x += inputDir.x
    snake[0].y += inputDir.y
}

export function draw(gameBoard) {
    snake.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegment += amount
}

export function onSnake(pos, { ignoreHead = false } = {}) {
    return snake.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        if (equalPos(segment, pos)) {
            score += scoreIncrement
            return true
        } else return false
    })
}

export function getSnakeHead() {
    return snake[0]
}

export function snakeIntersect() {
    return onSnake(snake[0], { ignoreHead: true })
}

export function getScore() {
    return score
}

export function setDifficulty(speed, inc) {
    snakeSpeed = speed
    scoreIncrement = inc
}

function equalPos(posX, posY) {
    return posX.x === posY.x && posX.y === posY.y
}

function addSegment() {
    for (let i = 0; i < newSegment; i++) {
        snake[snake.length] = { ...snake[snake.length - 1] }
    }

    newSegment = 0
}