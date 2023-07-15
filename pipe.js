const HOLE_HEIGHT = 120

function createPipe() {
 const pipeElem = document.createElement("div")
 const topElem = createPipeSegment("top")
 const bottomElem = createPipeSegment("bottom")
 pipeElem.append(topElem)
 pipeElem.append(bottomElem)
 pipeElem.classList.add("pipe")
 pipeElem.style.setProperty("--hole-top", randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * .5))
}

const pipe = {
 get left(){
  return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left",value))
 },
 set left()r
}

function createPipeSegment(position) {
 const segment = document.createElement("div")
 segment.classList.add("segment", position)
 return segment
}

function randomNumberBetween(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min)
}