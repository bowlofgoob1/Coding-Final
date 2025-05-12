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
