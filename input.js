let inputDir = { x: 0, y: 0 }
let lastInput = { x: 0, y: 0 }

let touchX = null
let touchY = null

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInput.y !== 0) break
            inputDir = { x: 0, y: -1 }
            break
        case 'ArrowDown':
            if (lastInput.y !== 0) break
            inputDir = { x: 0, y: 1 }
            break
        case 'ArrowRight':
            if (lastInput.x !== 0) break
            inputDir = { x: 1, y: 0 }
            break
        case 'ArrowLeft':
            if (lastInput.x !== 0) break
            inputDir = { x: -1, y: 0 }
            break
    }
})

document.addEventListener('touchstart', function(event) {
    touchX = event.changedTouches[0].screenX
    touchY = event.changedTouches[0].screenY
}, false)

document.addEventListener('touchmove', function(event) {
    if (!touchX || !touchY) return

    let releaseX = event.changedTouches[0].screenX
    let releaseY = event.changedTouches[0].screenY
    let difX = touchX - releaseX
    let difY = touchY - releaseY

    if (Math.abs(difX) > Math.abs(difY)) {
        if (difX > 0) {
            if (lastInput.x !== 0) return
            inputDir = { x: -1, y: 0 }
        } else {
            if (lastInput.x !== 0) return
            inputDir = { x: 1, y: 0 }
        }
    } else if (Math.abs(difX) < Math.abs(difY)) {
        if (difY > 0) {
            if (lastInput.y !== 0) return
            inputDir = { x: 0, y: -1 }
        } else {
            if (lastInput.y !== 0) return
            inputDir = { x: 0, y: 1 }
        }
    }
    touchX = null
    touchY = null
}, false)

export function getInputDir() {
    lastInput = inputDir
    return inputDir
}