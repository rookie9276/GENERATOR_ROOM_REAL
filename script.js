noteOpened = false;

b0 = document.getElementById("batteryCount");
b1 = document.getElementById("batteryOne");
b2 = document.getElementById("batteryTwo");
b3 = document.getElementById("batteryThree");
b4 = document.getElementById("batteryFour");
b5 = document.getElementById("batteryFive");
b6 = document.getElementById("batteryImage");

c0 = document.getElementById("closeNote");
c1 = document.getElementById("closeBat");

l1 = document.getElementById("leaveArrow");
m0 = document.getElementById("miniMap");
m1 = document.getElementById("myModalnote");
m2 = document.getElementById("myModalbat");

n1 = document.getElementById("noteOne");

r8 = document.getElementById("rotateLeft");
r9 = document.getElementById("rotateRight");
s11 = document.getElementById("slotsImage");
s22 = document.getElementById("slots");
s2 = document.getElementById("Sound2");

// --------------------
// SOUNDS
// --------------------
const sounds = {
  s1: document.getElementById("Sound1"),
  s2: document.getElementById("Sound2"),
  s3: document.getElementById("Sound3"),
  s4: document.getElementById("Sound4"),
  s5: document.getElementById("Sound5"),
  s6: document.getElementById("Sound6"),
  s7: document.getElementById("Sound7"),
  s8: document.getElementById("Sound8"),
};

// Play Sound1 immediately
sounds.s1?.play().catch(() => {});

// Configure volumes and loops
sounds.s2 && (sounds.s2.volume = 0.3);
sounds.s2 && (sounds.s2.loop = true);
sounds.s3 && (sounds.s3.loop = true);
sounds.s4 && (sounds.s4.volume = 0.1);
sounds.s4 && (sounds.s4.loop = true);
sounds.s5 && (sounds.s5.volume = 1);
sounds.s6 && (sounds.s6.volume = 1);
sounds.s7 && (sounds.s7.volume = 1);
sounds.s8 && (sounds.s7.volume = 1);

// Start looping sounds on first user interaction
document.addEventListener(
  "click",
  () => {
    // Start looping sounds
    sounds.s2?.play().catch(() => {});
    sounds.s3?.play().catch(() => {});
    sounds.s4?.play().catch(() => {});

    // Start highlight intervals only after user interaction
    setInterval(playSound5Highlight, 12000);
    setInterval(playSound6Highlight, 15000);
  },
  { once: true }
);
let batteryCountValue = 0;
const HOLD_TIME = 2;

const batteryValues = {
  batteryOne: 2,
  batteryTwo: 3,
  batteryThree: 3,
  batteryFour: 1,
  batteryFive: 4,
};

function openModal() {
  n1.src = "Images/Notes/NoteP1.png";
  m1.style.display = "flex";
  c0.style.display = "block";
  m0.style.display = "none";
}

function hideModal() {
  m1.style.display = "none";
  c0.style.display = "none";
  m0.style.display = "flex";
  noteOpened = true;

  // Only show batteries that are still uncollected
  [b1, b2, b3, b4, b5].forEach((b) => {
    if (b.style.display !== "none") {
      b.style.display = "block";
    }
  });
}

// Add this at the top of your JS
let timerInterval;
let timeLeft = 60; // 45 seconds countdown

function startTimer() {
  // Reset timer
  clearInterval(timerInterval);
  timeLeft = 60;

  // Create a visible element if it doesn't exist
  let timerDisplay = document.getElementById("timerDisplay");
  if (!timerDisplay) {
    timerDisplay = document.createElement("div");
    timerDisplay.id = "timerDisplay";
    timerDisplay.style.position = "absolute";
    timerDisplay.style.top = "10px";
    timerDisplay.style.right = "10px";
    timerDisplay.style.color = "red";
    timerDisplay.style.fontSize = "24px";
    timerDisplay.style.fontWeight = "bold";
    m2.appendChild(timerDisplay);
  }

  timerDisplay.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.body.innerHTML = "";
      document.body.style.background = "black";
      const img = document.createElement("img");
      img.src = "Images/jumpscare.gif";

      sounds.s9.play();
      img.style.position = "fixed";
      img.style.top = "50%";
      img.style.left = "50%";
      img.style.transform = "translate(-50%, -50%)";
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      document.body.appendChild(img);
    }
  }, 1000);
}
function openModaltwo() {
  if (!noteOpened) return;

  if (batteryCountValue >= 13) {
    alert(
      "YOU MUST ROTATE THE BATTERY SO THEY FIT IN THE SLOT // CLICK: ENTER"
    );
    m2.style.display = "flex";
    c1.style.display = "none";
    m0.style.display = "none";
    const modal = document.getElementById("myModalbat");
    if (!modal) return;
    modal.style.display = "flex";
    modal.style.background = "black";

    startTimer(); // Start 45-second timer
  } else {
    alert("F1ND All OF TH3M // CLICK: ENTER");
  }
}

function hideModaltwo() {
  if (batteryCountValue !== 0) return;

  // Stop the timer
  clearInterval(timerInterval);
  const timerDisplay = document.getElementById("timerDisplay");
  if (timerDisplay) timerDisplay.remove();

  // Hide modal and restore UI
  m2.style.display = "none";
  c1.style.display = "none";
  m0.style.display = "flex";

  // Restore flashlight and darkness
  light.style.display = "block";
  dark.style.display = "block";
  dark.style.background = "rgba(0,0,0,0)"; // remove darkness
  startFlicker(); // restart flicker if needed

  // Keep the modal elements hidden
  b6.style.display = "none";
  r8.style.display = "none";
  r9.style.display = "none";

  // Show the key
  s22.src = "Images/key.png";
  s22.style.display = "block";
  s22.classList.add("clickable");
  l1.src = "Images/down-arrow.png";
  alert("YOU HAVE THE KEY, NOW LEAVE!!! // CLICK: ENTER");
}

function changeNoteright() {
  if (n1.src.match("NoteP1")) n1.src = "Images/Notes/NoteP2.png";
  else if (n1.src.match("NoteP2")) n1.src = "Images/Notes/NoteP3.png";
  else if (n1.src.match("NoteP3")) n1.src = "Images/Notes/NoteP4.png";
  else if (n1.src.match("NoteP4")) n1.src = "Images/Notes/NoteP5.png";
  else if (n1.src.match("NoteP5")) n1.src = "Images/Notes/NoteP6.png";
  else n1.src = "Images/Notes/NoteP1.png";
}

function changeNoteleft() {
  if (n1.src.match("NoteP6")) n1.src = "Images/Notes/NoteP5.png";
  else if (n1.src.match("NoteP5")) n1.src = "Images/Notes/NoteP4.png";
  else if (n1.src.match("NoteP4")) n1.src = "Images/Notes/NoteP3.png";
  else if (n1.src.match("NoteP3")) n1.src = "Images/Notes/NoteP2.png";
  else if (n1.src.match("NoteP2")) n1.src = "Images/Notes/NoteP1.png";
  else n1.src = "Images/Notes/NoteP6.png";
}

function collectBattery(id) {
  let el = document.getElementById(id);
  if (el.style.display !== "none") {
    el.style.display = "none";
    batteryCountValue += batteryValues[id];
    b0.innerText = batteryCountValue;
  }
}

Object.keys(batteryValues).forEach((id) => {
  document.getElementById(id).onclick = () => collectBattery(id);
});

let batteryRotation = 0;
let rotationIndex = 0;
let holdTimer = null;
let holding = false;

const rotationOrder = [180, 180, 0, 180, 0, 0, 180, 180, 0, 180, 0, 0, 0];

const randomAngles = [30, 60, 90, 120, 150, 210, 240, 270, 300, 330];

function normalizeAngle(a) {
  return ((a % 360) + 360) % 360;
}

function snapToRandomAngle() {
  let angle = randomAngles[Math.floor(Math.random() * randomAngles.length)];
  batteryRotation = angle;
  b6.style.transform = `rotate(${batteryRotation}deg)`;
}

function clearHold() {
  clearTimeout(holdTimer);
  holdTimer = null;
  holding = false;
}
function startHold() {
  if (holding) return;
  holding = true;
  holdTimer = setTimeout(() => {
    batteryCountValue--;
    b0.innerText = batteryCountValue;
    rotationIndex++;
    clearHold();
    snapToRandomAngle();

    if (batteryCountValue === 0) {
      c1.style.display = "block";
      b6.style.display = "none";
      r8.style.display = "none";
      r9.style.display = "none";
    }
  }, HOLD_TIME * 300);
}

function checkRotation() {
  if (batteryCountValue <= 0) return;
  if (rotationIndex >= rotationOrder.length) return;

  let current = normalizeAngle(batteryRotation);
  let target = normalizeAngle(rotationOrder[rotationIndex]);

  if (current === target && batteryCountValue === 13 - rotationIndex) {
    startHold();
  } else {
    clearHold();
  }
}

r8.onclick = () => {
  batteryRotation -= 30;
  b6.style.transform = `rotate(${batteryRotation}deg)`;
  clearHold();
  checkRotation();
};

r9.onclick = () => {
  batteryRotation += 30;
  b6.style.transform = `rotate(${batteryRotation}deg)`;
  clearHold();
  checkRotation();
};
function goDown() {
  // Open external link when down arrow clicked
  window.location.href =
    "https://theinterceptoryt.github.io/FrontDoorGeneratorFinal---3/";
}
const light = document.createElement("div");
const dark = document.createElement("div");
const cursorDot = document.createElement("div");

light.classList.add("flashlight", "flash-on");
dark.id = "darkness";
dark.classList.add("flash-on");
cursorDot.id = "cursorDot";

document.body.appendChild(light);
document.body.appendChild(dark);
document.body.appendChild(cursorDot);

let flickerInterval = null;
function startFlicker() {
  if (flickerInterval) clearInterval(flickerInterval);

  flickerInterval = setInterval(() => {
    const size = 220 + Math.random() * 40; // subtle flicker
    dark.style.setProperty("--size", size + "px");
  }, 120);
}

function stopFlicker() {
  if (flickerInterval) clearInterval(flickerInterval);
}
// mouse movement
document.addEventListener("mousemove", (e) => {
  light.style.setProperty("--x", e.clientX + "px");
  light.style.setProperty("--y", e.clientY + "px");
  dark.style.setProperty("--x", e.clientX + "px");
  dark.style.setProperty("--y", e.clientY + "px");
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

// F key toggles flashlight and flicker
document.addEventListener("keydown", (e) => {
  if (e.key === "f") {
    if (light.classList.contains("flash-on")) {
      light.classList.remove("flash-on");
      light.classList.add("flash-off");
      dark.classList.remove("flash-on");
      dark.classList.add("flash-off");
      stopFlicker();
    } else {
      light.classList.remove("flash-off");
      light.classList.add("flash-on");
      dark.classList.remove("flash-off");
      dark.classList.add("flash-on");
      startFlicker();
    }
  }
});

// start flicker by default
startFlicker();
window.addEventListener("DOMContentLoaded", () => {
  // Use requestAnimationFrame to ensure the transition applies
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
    sounds.s9?.play().catch(() => {});
  });
});
