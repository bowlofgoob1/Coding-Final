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
};

// DOM Elements
const redButton = document.getElementById('red-button');
const greenButton = document.getElementById('green-button');
const blueButton = document.getElementById('blue-button');

// Initialize dots
const dots = {
  red: document.getElementById('red-dot'),
  yellow: document.getElementById('yellow-dot'),
  green: document.getElementById('green-dot'),
  cyan: document.getElementById('cyan-dot'),
  white: document.getElementById('white-dot'),
  purple: document.getElementById('purple-dot'),
  blue: document.getElementById('blue-dot')
};

function updateDots() {
  // Reset all dots to inactive
  for (const color in dots) {
      dots[color].style.backgroundColor = '#000';
  }

  // Activate dots based on current RGB state
  if (state.red) {
      dots.red.style.backgroundColor = 'red';
  }
  
  if (state.green) {
      dots.green.style.backgroundColor = 'green';
  }
  
  if (state.blue) {
      dots.blue.style.backgroundColor = 'blue';
  }
  
  if (state.red && state.green) {
      dots.yellow.style.backgroundColor = 'yellow';
  }
  
  if (state.green && state.blue) {
      dots.cyan.style.backgroundColor = 'cyan';
  }
  
  if (state.red && state.blue) {
      dots.purple.style.backgroundColor = 'purple';
  }
  
  if (state.red && state.green && state.blue) {
      dots.white.style.backgroundColor = 'white';
  }
}
