const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

  if (
      // |          dodgerLeftEdge dodgerRightEdge
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
              {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = `${top}px`

  GAME.appendChild(rock)

function moveRock() {
     rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)) {
   return endGame()
 }
    else if (top < GAME_HEIGHT) {
   window.requestAnimationFrame(moveRock)
 } else {
      rock.remove()
      }
}
 window.requestAnimationFrame(moveRock)
   ROCKS.push(rock)
   return rock
 }



function endGame() {
  clearInterval(gameInterval)
  // use a forEach
 ROCKS.forEach(rock => rock.remove()); // removes from dom
  while(ROCKS.length > 0){
    ROCKS.pop();
  } // clears array
 document.removeEventListener('keydown', moveDodger)
  START.innerHTML = "Try Again?"
  START.style = 'inline'
return alert('You Lose!')
}


function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft()
    }
    else if (e.which === RIGHT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight()
    }
}

function moveDodgerLeft() {
window.requestAnimationFrame(function(){
  var leftNumber = DODGER.style.left
  var leftPos = positionToInteger(leftNumber)
 if (leftPos > 0) {
    DODGER.style.left = `${leftPos - 4}px`
}
  })
  }


function moveDodgerRight() {
  window.requestAnimationFrame(function(){
    var leftNumber = DODGER.style.left
    var leftPos = positionToInteger(leftNumber)
   if (leftPos < 360) {
      DODGER.style.left = `${leftPos + 4}px`
    }
  })
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
