// Cat cards
const cats = [
  ['😺', '😸', '😹', '🐈‍⬛', '🙀', '😸'],
  ['🐈', '😼', '😽', '🐈', '😽', '😾'],
  ['🙀', '😿', '😾', '😺', '😿', '😺'],
  ['😿', '😿', '😺', '🐟', '😸', '😽'],
  ['🐟', '🐈‍⬛', '😸', '🐈‍⬛', '🐈', '😼'],
  ['😽', '😾', '😾', '🐈', '😹', '🐈‍⬛']
];

// Timer variables
let countdown = 300; // 5 minutes
let interval = null;
let timerDirection = "stop";
// stop = timer is not moving
// down = timer subtracts
// up = timer adds

// Questions
const question = [
  {
    id: 1,
    Q1: "Cats are the true gods of the world"
  },
  {
    id: 2,
    Q1: "Are cats' collar bones not connected to their other bones?"
  },
  {
    id: 3,
    Q1: "Are cat genomes 95.5 percent tiger?"
  },
  {
    id: 4,
    Q1: "Worship the cats you can't escape your sin"
  },
  {
    id: 5,
    Q1: "Are cats' eyes made of former heretics?"
  },
  {
    id: 6,
    Q1: "The whispers are your friends"
  },
  {
    id: 7,
    Q1: "Were cats domesticated in 7000 BC?"
  },
  {
    id: 8,
    Q1: "Cats have 126 bones"
  },
  {
    id: 9,
    Q1: "Black cats are only seen as evil due to old superstition"
  }
];

// Game variables
let firstcell = null;
let firstrow = -1;
let firstcol = -1;
let matches = 0;
let attempts = 0;

// Start game
function Playgame() {
  let html = "<table>";

  for (let i = 0; i < cats.length; i++) {
    html += "<tr>";

    for (let j = 0; j < cats[i].length; j++) {
      html += `
        <td onclick="cellClicked(this, ${i}, ${j})">
          <img src="kitty.gif" alt="eye" id="eye">
        </td>
      `;
    }

    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("grid").innerHTML = html;

  firstcell = null;
  firstrow = -1;
  firstcol = -1;
  matches = 0;
  attempts = 0;

  countdown = 300;
  timerDirection = "stop";

  clearInterval(interval);
  updateTimerDisplay();

  document.getElementById("messages").innerHTML = `
    <p class="start-message">
      Click two kitty cards. If they do not match, the timer will start decreasing.
    </p>
  `;

  console.log("Game started.");
  console.log("Timer is showing 5:00 but not moving yet.");
}

// Cell click function
function cellClicked(cell, row, col) {
  if (!cell.innerHTML.includes("kitty.gif")) {
    return;
  }

  cell.innerHTML = cats[row][col];

  if (firstrow === -1) {
    firstcell = cell;
    firstrow = row;
    firstcol = col;

    console.log("First cell clicked:", row, col);
    return;
  }

  attempts++;

  console.log("Second cell clicked:", row, col);
  console.log("Attempts:", attempts);

  if (cats[firstrow][firstcol] === cats[row][col]) {
    matches++;

    console.log("Match found.");
    console.log("Matches:", matches);

    document.getElementById("messages").innerHTML = `
      <div class="Kitty">
        <h1>Kitty is Happy with you</h1>
        <a href="pet.html"><img src="Teto.jpg" alt="kitty"></a>
        <audio src="meow.mp3" type="audio/mpeg" autoplay></audio>
      </div>
    `;
  } else {
    console.log("No match found.");
    console.log("Timer will now start decreasing.");

    firstcell.innerHTML = `<img src="kitty.gif" alt="eye" id="eye">`;
    cell.innerHTML = `<img src="kitty.gif" alt="eye" id="eye">`;

    showQuestion();

    timerDirection = "down";
    startTimer();
  }

  firstcell = null;
  firstrow = -1;
  firstcol = -1;
}

// Show random question with True/False buttons inside the box
function showQuestion() {
  const randomIndex = Math.floor(Math.random() * question.length);

  document.getElementById("messages").innerHTML = `
    <div class="riddle" id="question-${question[randomIndex].id}">
      <audio src="monster.mp3" type="audio/mpeg" autoplay></audio>

      <h4>${question[randomIndex].Q1}</h4>

      

      <div class="answer-buttons">
        <button class="question-btn" onclick="trueClicked()">True</button>
        <button class="question-btn" onclick="falseClicked()">False</button>
      </div>
    </div>
  `;
}

// True button inside question
function trueClicked() {
  console.log("TRUE clicked.");
  console.log("Time before true:", countdown);

  timerDirection = "up";
  startTimer();

  console.log("Timer direction is now:", timerDirection);
}

// False button inside question
function falseClicked() {
  console.log("FALSE clicked.");
  console.log("Time before false:", countdown);

  timerDirection = "down";
  startTimer();

  console.log("Timer direction is now:", timerDirection);
}

// Timer function
function startTimer() {
  clearInterval(interval);

  console.log("startTimer called.");
  console.log("Current timer direction:", timerDirection);

  interval = setInterval(function () {
    if (timerDirection === "down") {
      countdown = countdown - 1;
      console.log("Timer decreasing:", countdown);
    } else if (timerDirection === "up") {
      countdown = countdown + 1;
      console.log("Timer increasing:", countdown);
    } else {
      console.log("Timer stopped.");
      clearInterval(interval);
      return;
    }

    if (countdown <= 0) {
      countdown = 0;
      clearInterval(interval);
      endGame();
      return;
    }

    updateTimerDisplay();
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  let minutes = Math.floor(countdown / 60);
  let seconds = countdown % 60;

  document.getElementById("demo").innerHTML =
    `${minutes}:${String(seconds).padStart(2, "0")}`;
}

// End game
function endGame() {
  document.getElementById("demo").innerHTML = `
    <div>
      <a href="scary.html">
        <button class="button">Forgiveness</button>
      </a>
    </div>
  `;
}

// Optional instructions function
function Info(){
  document.getElementById("introContainer").innerHTML = `
    <div class="intro" id="intro">
      <h2>Instructions</h2>
      <p>1. Press the play button.</p>
      <p>2. Click two cards.</p>
      <p>3. If they do not match, the timer starts decreasing.</p>
      <p>4. Click True to make the timer increase.</p>
      <p>5. Click False to make the timer decrease.</p>
      <p>6. When all matches been found than click the happy cat.</p>
      <p>7. PET THE CAT.</p>
      <button onclick="closeButton()">Close</button>
    </div>
  `;
}

function closeButton() {
  document.getElementById("intro").style.display = "none";
  console.log("Huh?")
  console.log(document.getElementById("intro"))
}