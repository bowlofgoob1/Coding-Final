// Get references to the button and the loading text elements
const button = document.getElementById('startButton');
const loadingText = document.getElementById('loadingText');

// Add a click event listener to the button
button.addEventListener('click', () => {
  // Hide the start button when clicked
  button.classList.add('hidden');

  // Show the "Loading..." text
  loadingText.classList.remove('hidden');

  // After 3 seconds, update the text to something more confusing
  setTimeout(() => {
    loadingText.textContent = 'Still loading...';
  }, 3000);

  // After 6 seconds, update it again to add a sense of unease
  setTimeout(() => {
    loadingText.textContent = 'Why are you still here?';
  }, 6000);
});


// Dots -------------------------------------------------------
// Game state
 const state = {
  red: false,
  green: false,
  blue: false,
  sequence: ['red', 'yellow', 'green', 'cyan', 'white', 'purple', 'blue'],
  markedColors: [],
  prevActiveColor: null
};

// Get references to important HTML elements
const redButton = document.getElementById('red-button');
const greenButton = document.getElementById('green-button');
const blueButton = document.getElementById('blue-button');
const message = document.getElementById('message');
const redBulb = document.getElementById('red-bulb');
const greenBulb = document.getElementById('green-bulb');
const blueBulb = document.getElementById('blue-bulb');

// Store references to all the color dots
const dots = {
    red: document.getElementById('red-dot'),
    yellow: document.getElementById('yellow-dot'),
    green: document.getElementById('green-dot'),
    cyan: document.getElementById('cyan-dot'),
    white: document.getElementById('white-dot'),
    purple: document.getElementById('purple-dot'),
    blue: document.getElementById('blue-dot')
};

// Update the RGB button visuals based on current state
function updateButtons() {
    // Toggle active class based on state
    redBulb.classList.toggle('active', state.red);
    greenBulb.classList.toggle('active', state.green);
    blueBulb.classList.toggle('active', state.blue);
}

function getActiveColors() {
  // Start with an empty list
  const activeColors = [];
  
  // Add individual RGB colors if active
  if (state.red) activeColors.push('red');
  if (state.green) activeColors.push('green');
  if (state.blue) activeColors.push('blue');
  
  // Add mixed colors based on combinations
  if (state.red && state.green) activeColors.push('yellow');
  if (state.green && state.blue) activeColors.push('cyan');
  if (state.red && state.blue) activeColors.push('purple');
  if (state.red && state.green && state.blue) activeColors.push('white');
  
  return activeColors;
}

function updateDots() {
  // First reset all dots to inactive
  for (const color in dots) {
      dots[color].style.backgroundColor = '#333';
  }
  
  // Get all active colors and set their dots
  const activeColors = getActiveColors();
  activeColors.forEach(color => {
      dots[color].style.backgroundColor = color;
  });
}

// Update all the visuals
function updateDisplay() {
  updateButtons();
  updateDots();
}