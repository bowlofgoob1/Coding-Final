// Get references to the button and the loading text elements
//const button = document.getElementById('startButton');
//const loadingText = document.getElementById('loadingText');

// Add a click event listener to the button
//button.addEventListener('click', () => {
  //button.classList.add('hidden');
  //loadingText.classList.remove('hidden');
  //setTimeout(() => { loadingText.textContent = 'Still loading...'; }, 3000);
  //setTimeout(() => { loadingText.textContent = 'Why are you still here?'; }, 6000);
//});

// Dots -------------------------------------------------------
const state = {
  red: false,
  green: false,
  blue: false,
  sequence: ['red', 'yellow', 'green', 'cyan', 'white', 'purple', 'blue'],
  markedColors: [],
  prevActiveColor: null
};

const redButton = document.getElementById('red-button');
const greenButton = document.getElementById('green-button');
const blueButton = document.getElementById('blue-button');
const message = document.getElementById('message');
const redBulb = document.getElementById('red-bulb');
const greenBulb = document.getElementById('green-bulb');
const blueBulb = document.getElementById('blue-bulb');

const dots = {
  red: document.getElementById('red-dot'),
  yellow: document.getElementById('yellow-dot'),
  green: document.getElementById('green-dot'),
  cyan: document.getElementById('cyan-dot'),
  white: document.getElementById('white-dot'),
  purple: document.getElementById('purple-dot'),
  blue: document.getElementById('blue-dot')
};

function updateButtons() {
  redBulb.classList.toggle('active', state.red);
  greenBulb.classList.toggle('active', state.green);
  blueBulb.classList.toggle('active', state.blue);
}

function getActiveColors() {
  const activeColors = [];
  if (state.red) activeColors.push('red');
  if (state.green) activeColors.push('green');
  if (state.blue) activeColors.push('blue');
  if (state.red && state.green) activeColors.push('yellow');
  if (state.green && state.blue) activeColors.push('cyan');
  if (state.red && state.blue) activeColors.push('purple');
  if (state.red && state.green && state.blue) activeColors.push('white');
  return activeColors;
}

function updateDots() {
  for (const color in dots) {
    dots[color].style.backgroundColor = '#333';
  }

  const activeColors = getActiveColors();
  activeColors.forEach(color => {
    dots[color].style.backgroundColor = color;
  });
}

function updateDisplay() {
  updateButtons();
  updateDots();
}

// this checks if the current color combo matches the next color in the sequence
function updateTopRowDot() {
  // get all active colors (single and combo)
  const activeColors = getActiveColors();

  // figure out what step we're on in the sequence
  const currentIndex = state.markedColors.length;

  // get the color we're supposed to hit next
  const expectedColor = state.sequence[currentIndex];

  // if we already finished the whole sequence, stop
  if (currentIndex >= state.sequence.length) return;

  // check if the current combo includes the expected color
  if (activeColors.includes(expectedColor)) {
    // grab the correct dot in the row
    const dot = dots[expectedColor];

    // light it up with the actual color
    dot.style.backgroundColor = expectedColor;

    // grab the little white line above the dot
    const mark = dot.querySelector('.mark');

    // make the mark visible to show it's locked in
    mark.style.height = '10px';

    // store that we got this color right
    state.markedColors.push(expectedColor);

    // update the message depending on whether we're done or not
    message.textContent = state.markedColors.length === state.sequence.length
      ? "you win!"
      : "";
  } else {
    // if it's the wrong color, tell the user
    message.textContent = "hmmm...";
  }
}

// this gets called when i press red, green, or blue
function toggleColor(colorKey) {
  // flip the boolean for the color (on/off)
  state[colorKey] = !state[colorKey];

  // update bulbs and color dot visuals
  updateDisplay();

  // check if the current combo matches the next color in the sequence
  updateTopRowDot();
}

// clicking the red button toggles red
redButton.addEventListener('click', () => toggleColor('red'));

// clicking the green button toggles green
greenButton.addEventListener('click', () => toggleColor('green'));

// clicking the blue button toggles blue
blueButton.addEventListener('click', () => toggleColor('blue'));

// this animates the correct color order by lighting up each dot one at a time
document.getElementById('show-order-button').addEventListener('click', async () => {
  // show this message while the animation plays
  message.textContent = "watch closely...";

  // go through the color sequence one by one
  for (let color of state.sequence) {
    // grab the dot for this color
    const dot = dots[color];

    // grab the white mark above it
    const mark = dot.querySelector('.mark');

    // light up the dot
    dot.style.backgroundColor = color;

    // make the mark show up
    mark.style.height = '10px';

    // pause for half a second
    await new Promise(r => setTimeout(r, 500));

    // turn the dot back off
    dot.style.backgroundColor = '#333';

    // hide the mark again
    mark.style.height = '0';
  }

  // restore whatever the current game state was
  updateDisplay();

  // clear the message
  message.textContent = "";
});