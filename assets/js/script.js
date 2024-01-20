/* Add event listeners to Start and Reset buttons on DOM load */

document.addEventListener('DOMContentLoaded', function () {
   const buttons = document.getElementsByTagName('button');
   let divs = document.getElementsByClassName('alphabet-div');
   let secondsInterval; //Keep track of timer count
   let second = 0; //Set displaying time on page
   let timerRunning = false; //Game stopped
   let firstAlphabet = A; //Keep count of what alphabet is clicked



    //Add eventlisteners to Start and Reset buttons.
    for (let button of buttons) {
        button.addEventListener('click', handleClick);
    }


    //Functions to start and reset Buttons
    function handleClick(event) {
        if (event.target.getAttribute('data-type') === 'start') {
            secondsInterval = setInterval(setTimer, 1000); //Start timer
            timerRunning = true; //Start game
            document.getElementById('start-button').disabled = true;
        } else if (event.target.getAttribute('data-type') === 'reset') {
            clearInterval(secondsInterval);
            second = 0;
            let timer = document.getElementById('timer');
            timer.innerHTML = `Timer: ${second}`; //Reset timer in HTML
            timerRunning = false; //Stop game
            firstNumber = 1;
            document.getElementById('start-button').disabled = false;

            resetDivs();
            addNumToDiv();

        } else {
            alert('No game is running, please press "Start"');
        }
    }
    });

    //Add eventlisteners to the divs with alphabets inside, that are used to play game
    let divs = document.getElementsByClassName('alphabet-div');

    for (let div of divs) {
        div.addEventListener('click', handleDivClick);
}


/** Main game function, Click in correct order, and color if clicked correct, green.
    If clicked in wrong order, red, and game over.
*/
    function handleDivClick() {
        if (timerRunning === true) {
            let divAlphabet = parseInt(this.textContent);//Get Alphabet from clicked div
            if (divAlphabet === firstAlphabet && firstAlphabet < 26) {
                this.style.backgroundColor = 'green';//If Alphabet is correct, color background green
                firstAlphabet++;
        } else if (divAlphabet !== firstAlphabet) { 

            /*setTimeout function
            Waits 0.1 sec before displaying alert message.
            Had to use this so div would color red before alert displays.*/

            setTimeout(function () {
                alert('Game Over! Press Reset and then Start, to start a new game.');
            }, 100);
            this.style.backgroundColor = 'red';
            timerRunning = false;
            clearInterval(secondsInterval);//Stop timer
            
        } else { 

            //Game complete functionality

            if (firstAlphabet=== 26) {
                setTimeout(function () {
                    alert('Congratulations, you completed the game!');
                }, 100);
                this.style.backgroundColor = 'green';
                timerRunning = false;
                clearInterval(secondsInterval);
                bestTime();
            }
        }

    } else {
        alert('No game is currently running, please press Start! If game is completed, or game over, press Reset and then Start.');
    }
}
/** Timer function, starts when Start button is pressed.
 */

function setTimer() {
    let timer = document.getElementById('timer');
    timer.innerHTML = `Timer: ${second}`;
    second++;
}
addAlphabetToDiv();



//Creates an array and fills it randomly with Alphabets A-Z
function randomArray() {
    const array=[]; //Create an empty array

    while (array.length < 26) {
        let alphabet = Math.floor(Math.random() * 26) + 1; //Random alphabets A-Z

        if (array.includes(alphabet)) {
            continue; //If alpahbet already exists in array, skip this iteration
        } else {
            array.push(alphabet); //Push unique alphabet into array
        }
    }
    return array;
}


/** 
 * Uses the function randomArray to get random numbers.
 * Then inhabit alphabet-div in html with those numbers.
 * Used on DOM load, and when reset button is used.
*/
function addAlphabetToDiv() {
    let divs = document.getElementsByClassName('alphabet-div');
    let alphabets = randomArray(); //Function that generats array with random, unique Alphabets A-Z

    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = alphabets[i]; //Add the alphabets from randomArray to each alphabet-div in the html
    }
}


/**
 * To set divs back to their original color when game is reset
 */
function resetDivs() {
    let divs = document.getElementsByClassName('alphabet-div');

    for (let div of divs) {
        div.style.backgroundColor = '';
    }
}