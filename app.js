let color = '#000000'
let canvasSize = 576
let isPaining = false
let isOnCanvas = true
let canvasSizePX = 528
let squareSize = '22px'
const board = document.querySelector('#board')
const body = document.querySelector('body')
const nowColor = document.querySelector('#colorNow')
const eraser = document.querySelector('#Eraser')
const pipette = document.querySelector('#pipette')
const squareS = document.querySelectorAll('.square')
const btnClear = document.querySelector('#clearColor')
const canvasPicture = document.querySelector('.canvasPicture')
let cvsPic = canvasPicture.getContext('2d')
const fillCanvasBtn = document.querySelector('#fillCanvas')
const fillSquaresBtn = document.querySelector('#fillSquares')
const dwnlBtn = document.querySelector('#dwlButton')
const colorPicker = document.querySelector('#colorPicker')


const sizeSettings = {
    num0: 64,
    maxSizePX0: '336px',
    maxSize0: 336,
    sqrSize0: '42px',
    num1: 256,
    maxSizePX1: '512px',
    maxSize1: 512,
    sqrSize1: '32px',
    num2: 576,
    maxSizePX2: '528px',
    maxSize2: 528,
    sqrSize2: '22px',
    num3: 1024,
    maxSizePX3: '512px',
    maxSize3: 512,
    sqrSize3: '16px'
}

const colors = ['#ffffff', '#000000', '#b64040', '#34a13d', '#4A21DD', '#faed40', '#ec8bec']
const zeroColor = '#ffffff00'
const pipetteColor = 'pipette'

for (let i = 0; i < colors.length; i++) {
    btnC = document.querySelector(`#color${i}`)
    btnC.addEventListener('click', () => changeColor(colors[i]))
}
for (let i = 0; i < 4; i++) {
    btnS = document.querySelector(`#canvasSize${i}`)
    btnS.addEventListener('click', () => {
        squareSize = sizeSettings[`sqrSize${i}`]
        canvasSize = sizeSettings[`num${i}`]
        console.log(sizeSettings[`sqrSize${i}`])
        //clearCanvas(canvasSize, sizeSettings[`sqrSize${i}`])
        board.style.width = sizeSettings[`maxSizePX${i}`]
        canvasSizePX = sizeSettings[`maxSize${i}`]
        clearCanvas()
    })
}

createCanvas(canvasSize, '22px')

btnClear.addEventListener('click', () => clearCanvas(canvasSize))

eraser.addEventListener('click', () => changeColor(zeroColor))

pipette.addEventListener('click', () => {
    changeColor(pipetteColor)
    //event.target.classList.contains('square')
})

fillCanvasBtn.addEventListener('click', () => board.style.background = color)

fillSquaresBtn.addEventListener('click', () => {
    const allSquares = document.querySelectorAll('.square')
    for (let i = 0; i < canvasSize; i++) {
        allSquares[i].style.background = color
    }
})

dwnlBtn.addEventListener('click', () => dwnPicture())

nowColor.addEventListener('click', () => changeColorPicker())

function changeColorPicker() {
    colorPicker.classList.remove('hide')
    
    
    pickr.show()
}


function clearCanvas() {
    board.innerHTML = ""
    createCanvas()
}

function createCanvas(){
    for (let i = 0; i < canvasSize; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.style.width = squareSize
        square.style.height = squareSize
        board.style.width = String(canvasSizePX) + 'px'
        square.addEventListener('mousemove', () => setColorMove(square))
        square.addEventListener('click', () => setColorClick(square))
        board.append(square)
        canvasPicture.height = Math.sqrt(canvasSize)
        canvasPicture.width = Math.sqrt(canvasSize)
    }
}

function changeColor(getColor) {
    color = getColor
    const pcr_button = document.querySelector('.pcr-button')
    if (color != pipetteColor && color != zeroColor) {
        pcr_button.setAttribute('style', `--pcr-color:${color};`)
        nowColor.style.background = color
        colorPicker.classList.add('hide')
    } else if (color == pipetteColor) {
        nowColor.style.background = 'radial-gradient(closest-side, #ffffff 60%, #e69e18)'
    } else if (color == zeroColor) {
        nowColor.style.background = 'radial-gradient(closest-side, #ffffff 60%, #18e6d5)'
    }
}
function setColorMove(element) {
    if (color != pipetteColor) {
        if (isPaining) {
            element.style.background = color
        }
        if (!isOnCanvas) {
            finishPaint()
        }
    }
}

function setColorClick(element) {
    if (!isPaining ) {
        if (color != pipetteColor) {
            element.style.background = color
            //console.log(element.style.backgroundColor)
            //console.log(window.getComputedStyle(element).backgroundColor.split(',').length)
        } else {
            if (window.getComputedStyle(element).backgroundColor.split(',').length === 4) {
                console.log('Прозрачный')
            } else {
                changeColor(element.style.background)
            }
        }
    }
}

function startPaint() {
    isPaining = true
}
function finishPaint() {
    isPaining = false
}
function Paint(event) {
    const rect = board.getBoundingClientRect()
    const x = event.clientX - rect.x
    const y = event.clientY - rect.y
    //console.log(x, y)
    checkOnCanvas([x, y])
    return [x, y]
}

function checkOnCanvas(XY = [0, 0] ) {
    x = XY[0]
    y = XY[1]

    if (x < 0 || x > canvasSizePX - 1 || y < 0 || y > canvasSizePX - 1) {
        isPaining = false
        isOnCanvas = false
    }
    else {
        isOnCanvas = true
    }
}

board.addEventListener('mousedown', startPaint)
board.addEventListener('mouseup', finishPaint)
body.addEventListener('mousemove', Paint)


function getCanvasPicture() {
    const allSquares = document.querySelectorAll('.square')
    let squaresColors = []
    for (let i = 0; i < canvasSize; i++) {
        squaresColors.push(String(allSquares[i].style.background))
        if(squaresColors[i] == '') {
            squaresColors[i] = 'rgba(255, 255, 255, 0)'
        }
    }
    //console.log(squaresColors)
    for (let i = 0; i < canvasPicture.width; i++) {
        for (let j = 0; j < canvasPicture.height; j++) {
            cvsPic.beginPath()
            cvsPic.rect(j, i, 1, 1)
            cvsPic.fillStyle = squaresColors[i * canvasPicture.width + j]
            cvsPic.fill()
        }
    }
}

function backgroundFill() {
    const allSquares = document.querySelectorAll('.square')
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].style.background = color
    }
}

let pictureCount = 1
function dwnPicture() {
    image = canvasPicture.toDataURL("image/png", 1.0).replace("imagepng", "image/octet-stream")
    let link = document.createElement('a');
    link.download = `my-image${pictureCount}.png`;
    link.href = image;
    link.click();
    pictureCount++
}

setInterval(() => {
    getCanvasPicture()
}, 1000);


// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    container: '.colorNow',
    theme: 'nano', // or 'monolith', or 'nano'
    default: color,

    swatches: [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 183)',
        'rgb(63, 81, 181)',
        'rgb(33, 150, 243)',
        'rgb(3, 169, 244)',
        'rgb(0, 188, 212)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(139, 195, 74)',
        'rgb(205, 220, 57)',
        'rgb(255, 235, 59)',
        'rgb(255, 193, 7)'
    ],

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: false
        }
    }
});

pickr.on('change', (color, instance) => {
    const clrPiclerColor = color.toHEXA().toString(3)
    changeColor(clrPiclerColor)
})
