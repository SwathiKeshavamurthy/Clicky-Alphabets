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
