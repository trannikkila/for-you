const sceneOpening = document.getElementById("scene-opening");
const bubbleTextOpening = document.getElementById("bubble-text-opening");

const egg = document.getElementById("egg");
const eggCrack1 = document.getElementById("egg-crack-1");
const eggCrack2 = document.getElementById("egg-crack-2");

const sceneDinoHead = document.getElementById("scene-dino-head");
const bubbleTextScene2 = document.getElementById("bubble-text-scene2");
const eggBottom = document.getElementById("egg-bottom");
const dinoHead = document.getElementById("dino-head");
const eggTop = document.getElementById("egg-top");
const eggShells = document.getElementById("egg-shells");

const sceneDinoFull = document.getElementById("scene-dino-full");
const bubbleTextScene3 = document.getElementById("bubble-text-scene3");
const dinoFull = document.getElementById("dino-full");
const dinoFullShadow = document.getElementById("dino-full-shadow");

const sceneFlowerQuest = document.getElementById("scene-flower-quest");
const bubbleTextScene4 = document.getElementById("bubble-text-scene4");
const helpButton = document.getElementById("help-button");

const sceneBouquet = document.getElementById("scene-bouquet");
const bubbleTextScene5 = document.getElementById("bubble-text-scene5");
const dinoBouquet = document.getElementById("dino-bouquet");
const dinoBouquetShadow = document.getElementById("dino-bouquet-shadow");
const heartEffect = document.getElementById("heart-effect");

const flowerRed = document.getElementById("flower-red");
const flowerPink = document.getElementById("flower-pink");
const flowerYellow = document.getElementById("flower-yellow");
const flowerTurquoise = document.getElementById("flower-turquoise");
const flowerPurple = document.getElementById("flower-purple");

const fadeOverlay = document.getElementById("fade-overlay");

const natureAudio = document.getElementById("nature-audio");
const eggCrackAudio = document.getElementById("egg-crack-audio");
const dinoAppearAudio = document.getElementById("dino-appear-audio");
const popAudio = document.getElementById("pop-audio");

let hasStartedAudio = false;
let eggAlreadyTapped = false;
let flowersActivated = false;
let collectedBaseFlowers = 0;
let eggTapEnabled = false;

function renderBubble(el, text) {
  el.innerHTML = "";
  void el.offsetHeight;
  el.innerHTML = `<div class="bubble-content">${text}</div>`;
}

function setOpeningBubbleText(text) {
  bubbleTextOpening.textContent = text;
}

function setScene2BubbleText(text) {
  renderBubble(bubbleTextScene2, text);
}

function setScene3BubbleText(text) {
  renderBubble(bubbleTextScene3, text);
}

function setScene4BubbleText(text) {
  renderBubble(bubbleTextScene4, text);
}

function setScene5BubbleText(text) {
  renderBubble(bubbleTextScene5, text);
}

function playEggShake() {
  egg.classList.remove("egg-shake");
  eggCrack1.classList.remove("egg-crack-shake");
  eggCrack2.classList.remove("egg-crack-shake");

  void egg.offsetWidth;

  egg.classList.add("egg-shake");
  if (!eggCrack1.classList.contains("hidden")) eggCrack1.classList.add("egg-crack-shake");
  if (!eggCrack2.classList.contains("hidden")) eggCrack2.classList.add("egg-crack-shake");
}

function playEggCrackSound() {
  eggCrackAudio.currentTime = 0;
  eggCrackAudio.play();
}

function playDinoAppearSound() {
  dinoAppearAudio.currentTime = 0;
  const promise = dinoAppearAudio.play();
  if (promise !== undefined) {
    promise.catch(() => {});
  }
}

function playPopSound() {
  popAudio.currentTime = 0;
  popAudio.play();
}

function unlockExtraAudio() {
  dinoAppearAudio.volume = 1;
  dinoAppearAudio.play().then(() => {
    dinoAppearAudio.pause();
    dinoAppearAudio.currentTime = 0;
  }).catch(() => {});
}

function startNatureAudio() {
  if (!hasStartedAudio) {
    natureAudio.volume = 0.01;
    natureAudio.play();
    hasStartedAudio = true;
  }
}

function pickFlowerEffect(flowerElement) {
  flowerElement.classList.remove("active-flower", "flower-activate");
  flowerElement.style.pointerEvents = "none";
  flowerElement.classList.add("flower-picked");

  setTimeout(() => {
    flowerElement.classList.add("hidden");
  }, 500);
}

function startOpeningText() {
  const bubbleWrap = document.getElementById("bubble-wrap-opening");

  // Hide bubble
  bubbleWrap.classList.add("hidden");

  // Show bubble
  setTimeout(() => {
    bubbleWrap.classList.remove("hidden");
    setOpeningBubbleText("...hello?");
  }, 2000);

  // Then instruction
  setTimeout(() => {
    setOpeningBubbleText("Tap on egg");
    eggTapEnabled = true;
  }, 5500);
}
function handleEggTap() {
  if (!eggTapEnabled) return;
  if (eggAlreadyTapped) return;
  eggAlreadyTapped = true;

  startNatureAudio();
  unlockExtraAudio();

  playEggShake();
  playEggCrackSound();
  eggCrack1.classList.remove("hidden");
  eggCrack1.classList.add("egg-crack-shake");

  setTimeout(() => {
    playEggShake();
    playEggCrackSound();
    eggCrack2.classList.remove("hidden");
    eggCrack2.classList.add("egg-crack-shake");
  }, 2800);

  setTimeout(() => {
    fadeOverlay.style.opacity = "1";
  }, 5000);

  setTimeout(() => {
    showScene2();
  }, 8000);
}

function showScene2() {
  sceneOpening.classList.add("hidden");
  sceneDinoHead.classList.remove("hidden");
  fadeOverlay.style.opacity = "0";

  eggBottom.classList.remove("hidden");

  eggShells.classList.remove("hidden");
  eggShells.classList.remove("egg-shells-pop");
  void eggShells.offsetWidth;
  eggShells.classList.add("egg-shells-pop");

  dinoHead.classList.remove("hidden");
  dinoHead.classList.add("dino-pop");

  setTimeout(() => {
    eggTop.classList.remove("hidden");
    eggTop.classList.add("egg-top-pop");
  }, 100);

  playDinoAppearSound();
  startScene2Dialogue();
}

function startScene2Dialogue() {
  setScene2BubbleText("Rawr!");

  setTimeout(() => {
    setScene2BubbleText("Oh! Hii you!");
  }, 3000);

  setTimeout(() => {
    setScene2BubbleText("I think I’m a little lost…");
  }, 7000);

  setTimeout(() => {
    setScene2BubbleText("but I’m really glad it was you<br>who found me");
  }, 11500);

  setTimeout(() => {
    fadeOverlay.style.opacity = "1";
  }, 15500);

  setTimeout(() => {
    showScene3();
  }, 16500);
}

function showScene3() {
  sceneDinoHead.classList.add("hidden");
  sceneDinoFull.classList.remove("hidden");

  fadeOverlay.style.opacity = "0";

  dinoFullShadow.classList.remove("hidden");
  dinoFull.classList.remove("hidden");
  dinoFull.classList.add("dino-full-pop");

  startScene3Dialogue();
}

function startScene3Dialogue() {
  setScene3BubbleText("My name is Dino…");

  setTimeout(() => {
    setScene3BubbleText("Yeah, I didn’t have much time<br>to think of something cooler");
  }, 3500);

  setTimeout(() => {
    setScene3BubbleText("I literally just hatched");
  }, 8000);

  setTimeout(() => {
    showScene4();
  }, 12000);
}

function showScene4() {
  sceneDinoFull.classList.add("hidden");
  sceneFlowerQuest.classList.remove("hidden");
  startScene4Dialogue();
}

function startScene4Dialogue() {
  setScene4BubbleText("Before I hatched, I remember hearing something…");

  setTimeout(() => {
    setScene4BubbleText("It said I needed to find 5 flowers…<br>but I don’t really know why yet");
  }, 4500);

  setTimeout(() => {
    setScene4BubbleText("Do you think you could help me find them?");
  }, 9500);

  setTimeout(() => {
    helpButton.classList.remove("hidden");
  }, 12500);
}

function activateFlowers() {
  if (flowersActivated) return;
  flowersActivated = true;

  [flowerRed, flowerPink, flowerYellow, flowerTurquoise].forEach((flower) => {
    flower.classList.add("active-flower", "flower-activate");
  });
}

function showPurplePart1() {
  setScene4BubbleText(
    "This one is special,<br>it feels deeper the more you look at it.<br>Kind of like you, every new piece,<br>gives me a reason to admire you more<span class='next-inline' id='purple-next-1'>Next</span>"
  );

  setTimeout(() => {
    const next1 = document.getElementById("purple-next-1");
    if (next1) next1.addEventListener("click", showPurplePart2);
  }, 50);
}

function showPurplePart2() {
  setScene4BubbleText(
    "And in the way that feels right, you have made me let go of my defenses I didn’t realize were there<span class='next-inline' id='purple-next-2'>Next</span>"
  );

  setTimeout(() => {
    const next2 = document.getElementById("purple-next-2");
    if (next2) next2.addEventListener("click", showAfterFlowersLines);
  }, 50);
}

function showAfterFlowersLines() {
  setScene4BubbleText("Oh...we found them all!");

  setTimeout(() => {
    setScene4BubbleText("Wait…I think I understand now");
  }, 4500);

  setTimeout(() => {
    fadeOverlay.style.opacity = "1";
  }, 6500);

  setTimeout(() => {
    showScene5();
  }, 8500);
}

function handleFlowerClick(flowerName, flowerElement) {
  if (!flowersActivated) return;

  playPopSound();
  pickFlowerEffect(flowerElement);

  if (flowerName === "red") {
    collectedBaseFlowers += 1;
    setScene4BubbleText("There’s strength in this flower, just like you.<br>Like the way you carry courage so deeply within you");
  }

  if (flowerName === "pink") {
    collectedBaseFlowers += 1;
    setScene4BubbleText("Warmth…<br>like the way you care and how you are yourself<br>in the most beautiful way");
  }

  if (flowerName === "yellow") {
    collectedBaseFlowers += 1;
    setScene4BubbleText("Oh...this flower shines so brightly...<br>I couldn’t help but smile when I saw it, because it reminds me of how moments with you feels<br>lighter and more special");
  }

  if (flowerName === "turquoise") {
    collectedBaseFlowers += 1;
    setScene4BubbleText("There’s something so peaceful about this one…<br>like the way you carry sense of understanding and safety and how that feeling stays");
  }

  if (collectedBaseFlowers === 4) {
    flowerPurple.classList.remove("hidden");
    flowerPurple.classList.add("active-flower", "flower-activate");
  }

  if (flowerName === "purple") {
    showPurplePart1();
  }
}

function showScene5() {
  sceneFlowerQuest.classList.add("hidden");
  sceneBouquet.classList.remove("hidden");
  fadeOverlay.style.opacity = "0";

  dinoBouquetShadow.classList.remove("hidden");
  dinoBouquet.classList.remove("hidden");
  dinoBouquet.classList.add("dino-full-pop");

  startScene5Dialogue();
}

function startScene5Dialogue() {
  setScene5BubbleText("I think…these weren’t just flowers");

  setTimeout(() => {
    setScene5BubbleText("They were pieces of how special you are.<br>These were always meant for you");
  }, 4000);

  setTimeout(() => {
    setScene5BubbleText("And somehow this doesn’t feel new at all…");
  }, 9000);

  setTimeout(() => {
    setScene5BubbleText("It feels like we crossed paths before");
  }, 13000);

  setTimeout(() => {
    setScene5BubbleText("Maybe that’s why<br>I was meant to find these");
  }, 17000);

  setTimeout(() => {
    setScene5BubbleText("so everything could lead me to you again");
  }, 21000);

  setTimeout(() => {
    setScene5BubbleText("Because you are someone really special");
  }, 25500);

  setTimeout(() => {
    setScene5BubbleText("And even though I was alone,<br>you found me");
  }, 29500);

  setTimeout(() => {
    setScene5BubbleText("You deserve so many beautiful things and honestly, there’s not enough flowers for someone amazing as you");
  }, 34000);

  setTimeout(() => {
    setScene5BubbleText("Hey");
  }, 40000);

  setTimeout(() => {
    setScene5BubbleText("I hope…even for a little moment,<br>I made you smile");
  }, 43000);

  setTimeout(() => {
    setScene5BubbleText("Because having you around<br>makes everything feel lighter");
  }, 47000);

  setTimeout(() => {
    setScene5BubbleText("Oh…and I might be a rare dino,<br>which means…I know things");
  }, 51500);

  setTimeout(() => {
    setScene5BubbleText("Like the fact that today is your birthday");
  }, 56500);

  setTimeout(() => {
    setScene5BubbleText("Happy Birthday to my wonderful one!");
  }, 61500);

  setTimeout(() => {
    setScene5BubbleText("I find myself thinking of you often, miss you.<br>I will be around dear, always");
    heartEffect.classList.remove("hidden");
    heartEffect.classList.remove("heart-pop-stay");
    void heartEffect.offsetWidth;
    heartEffect.classList.add("heart-pop-stay");
  }, 67500);
}

egg.addEventListener("click", handleEggTap);

helpButton.addEventListener("click", () => {
  helpButton.classList.add("hidden");
  activateFlowers();
});

flowerRed.addEventListener("click", () => handleFlowerClick("red", flowerRed));
flowerPink.addEventListener("click", () => handleFlowerClick("pink", flowerPink));
flowerYellow.addEventListener("click", () => handleFlowerClick("yellow", flowerYellow));
flowerTurquoise.addEventListener("click", () => handleFlowerClick("turquoise", flowerTurquoise));
flowerPurple.addEventListener("click", () => handleFlowerClick("purple", flowerPurple));

startOpeningText();