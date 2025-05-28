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
  prevActiveColor: null,
  totalClicks: 0  // Add this line
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
  const active = [];
  if (state.red) active.push('red');
  if (state.green) active.push('green');
  if (state.blue) active.push('blue');
  if (state.red && state.green) active.push('yellow');
  if (state.green && state.blue) active.push('cyan');
  if (state.red && state.blue) active.push('purple');
  if (state.red && state.green && state.blue) active.push('white');
  return active;
}

function updateDots() {
  for (const c in dots) {
    dots[c].style.backgroundColor = '#333';
  }
  getActiveColors().forEach(c => {
    dots[c].style.backgroundColor = c;
  });
} //this updates the dots based on the current state

function updateDisplay() {
  updateButtons();
  updateDots();
}

// helper: exact button combo for each color
function getComboFromColor(color) {
  switch (color) {
    case 'red':    return { red: true,  green: false, blue: false };
    case 'green':  return { red: false, green: true,  blue: false };
    case 'blue':   return { red: false, green: false, blue: true  };
    case 'yellow': return { red: true,  green: true,  blue: false };
    case 'cyan':   return { red: false, green: true,  blue: true  };
    case 'purple': return { red: true,  green: false, blue: true  };
    case 'white':  return { red: true,  green: true,  blue: true  };
    default:       return { red: false, green: false, blue: false };
  }
}

// check if current combo EXACTLY matches the expected color
function updateTopRowDot() {
  const idx = state.markedColors.length;
  if (idx >= state.sequence.length) return;

  const expected = state.sequence[idx];
  const combo = getComboFromColor(expected);

  const isExactMatch =
    state.red   === combo.red &&
    state.green === combo.green &&
    state.blue  === combo.blue;

  if (isExactMatch) {
    const dot = dots[expected];
    const mark = dot.querySelector('.mark');
    dot.style.backgroundColor = expected;
    mark.style.height = '10px';
    state.markedColors.push(expected);
    
    if (state.markedColors.length === state.sequence.length) {
      message.textContent = "ok";
      document.getElementById('winSound').play();  // Add this line
      // Reset everything after completion
      setTimeout(() => {
        state.markedColors = [];
        state.red = state.green = state.blue = false;  // Reset button states
        Object.values(dots).forEach(dot => {
          dot.style.backgroundColor = '#333';
          dot.querySelector('.mark').style.height = '0';
        });
        updateDisplay();  // Update the visual state
        message.textContent = "";  // Clear the message
      }, 1000);  // Changed from 500 to 1000 for 1 second
    }
  }
}

function toggleColor(colorKey) {
  state.totalClicks++;  // Increment click counter
  state[colorKey] = !state[colorKey];
  updateDisplay();
  updateTopRowDot();

  if (state.totalClicks === 7) {
    state.totalClicks = 0;  // Reset counter
    state.markedColors = [];
    state.red = state.green = state.blue = false;
    Object.values(dots).forEach(dot => {
      dot.style.backgroundColor = '#333';
      dot.querySelector('.mark').style.height = '0';
    });
    updateDisplay();
  }
}

redButton.addEventListener('click', () => toggleColor('red'));
greenButton.addEventListener('click', () => toggleColor('green'));
blueButton.addEventListener('click', () => toggleColor('blue'));

// “?” button: reset progress, then replay sequence
document.getElementById('show-order-button').addEventListener('click', async () => {
  // reset state
  state.red = state.green = state.blue = false;
  state.markedColors = [];
  updateDisplay();

  message.textContent = "watch closely...";

  for (let color of state.sequence) {
    const dot = dots[color];
    const mark = dot.querySelector('.mark');
    dot.style.backgroundColor = color;
    mark.style.height = '10px';
    await new Promise(r => setTimeout(r, 500));
    dot.style.backgroundColor = '#333';
    mark.style.height = '0';
  }

  updateDisplay();
  message.textContent = "";
});
