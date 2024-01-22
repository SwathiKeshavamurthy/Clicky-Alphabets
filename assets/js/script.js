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

      function resetGame() {
        // Reset the game state
        currentImageIndex = 0;
  
        // Set timer to 0
        seconds = 0;
  
        // Clear the timer
        clearInterval(timer);
  
        // Disable the reset button
        resetButton.disabled = true;
  
        // Remove existing images
        imageContainer.innerHTML = '';
  
        // Update the timer display immediately
        timerElement.textContent = `Timer: 0 second(s)`;

      }

      function displayImages() {
        // Display the shuffled images
        for (const imageUrl of shuffledImages) {
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = 'Image';
          imgElement.onclick = () => handleImageClick(imgElement);
          imageContainer.appendChild(imgElement);
        }
      }

      function handleImageClick(clickedImage) {
        // Check if the clicked image is in the correct order
        const expectedLetter = String.fromCharCode(97 + currentImageIndex);
        const clickedLetter = clickedImage.src.charAt(clickedImage.src.lastIndexOf('/') + 1).toLowerCase();
  
        if (clickedLetter === expectedLetter) {
          // Mark the image as correct
          clickedImage.classList.add('correct');
  
          // Increment the index for the next image
          currentImageIndex++;
  
          // Check if all images have been clicked in order
          if (currentImageIndex === shuffledImages.length) {
            clearInterval(timer);
  
            // Check and update the best time
            console.log('bestTime', bestTime);
            console.log('seconds',seconds);
            if (seconds < bestTime || bestTime === null) {
              bestTime = seconds;
              setBestTime(bestTime);
              bestTimeElement.textContent = `Best Time: ${bestTime} seconds`;
              alert(`Congratulations! You completed the game in ${seconds} seconds. New best time!`);
            } else {
              alert(`Congratulations! You completed the game in ${seconds} seconds.`);
            }
  
            // Reset the game
            resetGame();
          }
        } else {
          // Mark the image as incorrect
          clickedImage.classList.add('incorrect');
          clearInterval(timer);
  
          // Alert game over
          alert('Game Over! You clicked the images out of order. To start again click Reset Game');
          
          // Disable further clicks on images if game over
          disableImageClicks();
        }
      }

      function disableImageClicks() {
        // Disable click event on all images if game over
        const images = document.querySelectorAll('img');
        images.forEach(img => img.onclick = null);
      }
  
      function updateTimer() {
        seconds++;
        timerElement.textContent = `Timer: ${seconds} second(s)`;
      }


      function generateAlphabetImages() {
        // (https://forum.freecodecamp.org/t/alphabet-generation-in-js-are-there-any-constants/532843)
        //(https://stackoverflow.com/questions/12376870/create-an-array-of-characters-from-specified-range)
        const alphabetImages = Array.from({ length: 26 }, (_, i) => `assets/images/alphabets-webp/${String.fromCharCode(97 + i)}.webp`);
        return shuffleArray(alphabetImages);
      }
  
      function shuffleArray(array) {
        //  Shuffle Algorithm(https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/)
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      function getBestTime() {
        return localStorage.getItem('bestTime') || null;
      }
  
      function setBestTime(time) {
        localStorage.setItem('bestTime', time);
      }