"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const soundStart = new Audio("sound/start.mp3");
const soundStop1 = new Audio("sound/stop1.mp3");
const soundStop2 = new Audio("sound/stop2.mp3");
const soundReset = new Audio("sound/reset.mp3");

let startTime;
let timeoutid;
let stopTime = 0;

setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click", function () {
  setButtonStateRunning();
  soundStart.currentTime = 0;
  soundStart.play();
  startTime = Date.now();
  countUp();
}, false);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click", function () {
  setButtonStateStopped();
  clearTimeout(timeoutid);
  stopTime = Date.now() - startTime;
  soundStop1.currentTime = 0;
  soundStop1.play();

  const elapsedSec = Math.floor(stopTime / 1000);
  if (elapsedSec === 10) {
    soundStop2.currentTime = 0;
    soundStop2.play();

    document.body.style.backgroundImage = "url('img/fireworks.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundColor = "transparent";
  }
}, false);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click", function () {
  soundReset.currentTime = 0;
  soundReset.play();
  setButtonStateInitial();
  timer.textContent = "00:00.000";
  stopTime = 0;
});

function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    countUp();
  }, 10);
}

function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden");
  start.classList.add("js-inactive");
  stop.classList.remove("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear");
  start.classList.add("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.remove("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}
