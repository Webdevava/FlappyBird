import { updateBird, setupBird, getBirdRect } from "./bird.js";
import { updatePipes, setupPipes, getPassedPipeCount, getPipeRects } from "./pipe.js";

document.addEventListener("keypress", handleStart, { once: true })

const title = document.querySelector("[data-title]")
const start_title = document.querySelector("[data-start]")
const bird = document.querySelector("[data-bird]")
const start_img = document.querySelector("[data-image]")
const subtitle = document.querySelector("[data-subtitle]")
const over_img = document.querySelector("[data-gameover]")

let lastTime;

function updateLoop(time) {

 if (lastTime == null) {
  lastTime = time
  window.requestAnimationFrame(updateLoop)
  return
 }


 const delta = time - lastTime
 updateBird(delta)
 updatePipes(delta)

 if (checkLose()) return handleLose()

 lastTime = time
 window.requestAnimationFrame(updateLoop)

}

function checkLose() {
 const birdRect = getBirdRect()

 const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))

 const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight

 if (insidePipe || outsideWorld) {
  playCollisionSound();
 }

 return outsideWorld || insidePipe
}

function playCollisionSound() {
 const collisionSound = new Audio("./music/hit.wav");
 collisionSound.volume = 0.5;
 collisionSound.play();
}

function isCollision(rect1, rect2) {
 return (
  rect1.left < rect2.right &&
  rect1.top < rect2.bottom &&
  rect1.right > rect2.left &&
  rect1.bottom > rect2.top
 )
}

function handleStart() {
 title.classList.add('hide')
 start_title.classList.add('hide')
 bird.classList.remove('hide')
 start_img.classList.add('hide')
 setupBird()
 setupPipes()
 lastTime = null
 window.requestAnimationFrame(updateLoop)

}

function handleLose() {
 setTimeout(() => {
  title.classList.remove('hide');
  subtitle.classList.remove('hide');
  subtitle.textContent = `${getPassedPipeCount()} PIPES`;
  over_img.classList.remove('hide')

  const gameOverSound = document.getElementById('gameOverSound');
  gameOverSound.currentTime = 0;
  gameOverSound.volume = 0.5;
  gameOverSound.play();

  document.addEventListener("keypress", handleStart, { once: true });
 }, 800);

}
