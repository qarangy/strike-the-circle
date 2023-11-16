const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  setGameTime()
  isGameStarted = true
  hide($start)
  show($timeHeader)
  hide($resultHeader)
  $gameTime.setAttribute('disabled', true)

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  show($start)
  $game.innerHTML = ''
  hide($timeHeader)
  show($resultHeader)
  $gameTime.removeAttribute('disabled')
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }
  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  const circle = document.createElement('div')
  let boxSize = getRandom(10, 50)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.height - boxSize

  circle.style.height = circle.style.width = boxSize + 'px'
  circle.style.position = 'absolute'
  circle.style.backgroundColor = '#5e5e5e'
  circle.style.borderRadius = '50px'
  circle.style.cursor = 'pointer'
  circle.style.top = getRandom(20, maxTop - 20) + 'px'
  circle.style.left = getRandom(20, maxLeft - 20) + 'px'
  circle.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', circle)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}