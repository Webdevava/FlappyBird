const birdElem = document.querySelector("[data-bird]")
const birdSpeed = .5;
const JUMP_DURATION=150;
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function setupBird(){
 setTop(window.innerHeight/2)
 document.removeEventListener("keydown",handleJump)
 document.addEventListener("keydown",handleJump)
}

export function updateBird(delta) {
 if(timeSinceLastJump < JUMP_DURATION){
 setTop(getTop() - birdSpeed*delta)

 }else{
 setTop(getTop() + birdSpeed*delta)
 }
timeSinceLastJump += delta
}

export function getBirdRect(){
 return birdElem.getBoundingClientRect()
}

function setTop(top) {
 birdElem.style.setProperty("--bird-top", top)
}

function getTop() {
 return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}

function handleJump(e) {
 if (e.code !== "Space") return;

 // Play the jump sound when the bird jumps
 const jumpSound = document.getElementById('jumpSound');
 jumpSound.currentTime = 0;
 jumpSound.volume = 0.2;
 jumpSound.play();

 timeSinceLastJump = 0;
}