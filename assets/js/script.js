/* Add event listeners to Start and Reset buttons on DOM load */

document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('imageContainer'); //Stores all 26 images
    const startButton = document.getElementById('startButton'); // Game starts when clicked
    const resetButton = document.getElementById('resetButton'); // Game Resets when clicked
    const timerElement = document.getElementById('timer'); // Display timer
    const bestTimeElement = document.getElementById('bestTime'); //Display best time


    let shuffledImages;
    let currentImageIndex = 0; //Current Image index is registered
    let timer; 
    let seconds = 0; //Display 0seconds on screen
    let bestTime = getBestTime(); //Stored in cached memeory 

    function startGame() {
        // Reset the game state
        resetGame();
  
        // Enable the reset button
        resetButton.disabled = false;
  
        // Set timer to 0
        seconds = 0;
  
        // Shuffle the images
        shuffledImages = generateAlphabetImages();
  
        // Display the shuffled images
        displayImages();
  
        // Start the timer
        timer = setInterval(updateTimer, 1000);
      }

});