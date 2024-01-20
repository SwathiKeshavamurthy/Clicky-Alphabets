/**
 * Add event listeners to Start and Reset buttons on DOM load
 */
document.addEventListener('DOMContentLoaded', function () {
   const buttons = document.getElementsByTagName('button');

    //Add eventlisteners to Start and Reset buttons.
    for (let button of buttons) {
        button.addEventListener('click', handleClick);
    }
    //Functions to start and reset Buttons
    function handleClick(event) {
        if (event.target.getAttribute('data-type') === 'start') {
            alert('You hit the Start button');
        } else if (event.target.getAttribute('data-type') === 'reset') {
            alert('You hit the reset button');
        } else {
            alert('No game is running, please press "Start"');
        }
    }
    });

    //Add eventlisteners to the divs with alphabets inside, that are used to play game
    function clickableDivs() {
    let divs = document.getElementsByClassName('alphabet-div');

    for (let div of divs) {
        div.addEventListener('click', function () {
            alert('You clicked a alphabet-div');
            let divAlphabet = parseInt(div.textContent); //Gets the alphabet inside the div clicked
            alert(`You clicked ${divAlphabet}`);
        });
    }
}

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