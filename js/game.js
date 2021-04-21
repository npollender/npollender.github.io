import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersect, getScore, setDifficulty } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { setDiffFlag } from './input.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
const score = document.getElementById('score')
const control = document.getElementById('control')
let gameOver = false

function main(currentTime) {

    if (gameOver) {
        if (confirm('You lose, press OK to restart.')) {
            window.location = '/snake.html'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
}

control.innerHTML = 'Desktop: Use the arrow keys to move!<br>Mobile: Swipe your screen to move!'
pickDifficulty()
window.requestAnimationFrame(main)

function update() {
    score.innerHTML = 'Score: ' + getScore()
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect()
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > 21 ||
        position.y < 1 || position.y > 21
    )
}

function pickDifficulty() {
    const buttonE = document.getElementById('buttonE')
    const buttonM = document.getElementById('buttonM')
    const buttonH = document.getElementById('buttonH')

    buttonE.innerHTML = 'Easy'
    buttonM.innerHTML = 'Medium'
    buttonH.innerHTML = 'Hard'

    buttonE.onclick = function() {
        setDifficulty(5, 1)
        buttonE.style.display = 'none'
        buttonM.style.display = 'none'
        buttonH.style.display = 'none'
        setDiffFlag()
        return
    }

    buttonM.onclick = function() {
        setDifficulty(10, 3)
        buttonE.style.display = 'none'
        buttonM.style.display = 'none'
        buttonH.style.display = 'none'
        setDiffFlag()
        return
    }

    buttonH.onclick = function() {
        setDifficulty(20, 5)
        buttonE.style.display = 'none'
        buttonM.style.display = 'none'
        buttonH.style.display = 'none'
        setDiffFlag()
        return
    }
}