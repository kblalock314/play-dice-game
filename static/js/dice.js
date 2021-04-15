//Store HTML IDs into variables
const playerIcon1 = document.getElementById('playericon1');
const playerIcon2 = document.getElementById('playericon2');
const playerStatus = document.getElementById('playerstatus');
const compIcon1 = document.getElementById('compicon1');
const compIcon2 = document.getElementById('compicon2');
const compStatus = document.getElementById('compstatus');
const continueButton = document.getElementById('continue');
const startOverButton = document.getElementById('startover');
const rollDiceButton = document.getElementById('rolldice');

//Add event listeners
rollDiceButton.addEventListener('click', rollDice);
continueButton.addEventListener('click', rollDice);
startOverButton.addEventListener('click', startOver);

//Initiate global variables for dice numbers and their total
var d1;
var d2;
var diceTotal;

//Initiate variables for holding die points
var compPoints = 0;
var playerPoints = 0;

//Function to generate random numbers for two dice and store them (and their total) into variables
function generateRandom() {
  //Generate two random numbers and store them into the global dice variables
  d1 = Math.floor(Math.random() * 6) + 1;
  d2 = Math.floor(Math.random() * 6) + 1;

  //Store the total of the two dice into a variable
  diceTotal = d1 + d2;
}

//Function for updating the HTML with dice numbers and their total for the player's turn
function playerDiceDisplay() {
  //Roll the dice
  generateRandom();

  //Store the global dice variables into new unique variables
  playerd1 = d1;
  playerd2 = d2;
  playerDiceTotal = diceTotal;

  //Display the player's dice numbers and their total on the page
  updateIcons(playerIcon1, playerIcon2, playerd1, playerd2);
  playerStatus.innerText = 'You rolled ' + playerDiceTotal + '.   ';
}

//Function for updating the HTML with dice numbers and their total for the computer's turn
function computerDiceDisplay() {
  //Roll the dice
  generateRandom();

  //Store global dice variables into new unique variables
  compd1 = d1;
  compd2 = d2;
  compDiceTotal = diceTotal;

  //Display the player's dice numbers and their total on the page
  updateIcons(compIcon1, compIcon2, compd1, compd2);
  compStatus.innerText = 'The computer rolled ' + compDiceTotal + '.   ';
}

//Function to roll the dice for both the player and computer on click
function rollDice() {
  //Make sure the double points message on the page gets removed if it was previously displayed
  doublepoints.innerText = '';

  //Generate two dice numbers and their total for each player
  playerDiceDisplay();
  computerDiceDisplay();

  //If the player's total is greater than the computer's total, announce that the player has won
  if (playerDiceTotal > compDiceTotal) {
    winner.innerText = 'You win this round!';

    //If the player rolled a double, double their points for this round and add that number to their running total
    if (playerd1 === playerd2) {
      doublepoints.innerText =
        'You also rolled a double, you get double points!';
      playerPoints += playerDiceTotal * 2;
    }

    //If the player did not roll a double, add their dice total for this round to their running total
    else {
      playerPoints += playerDiceTotal;
    }
  }

  //If the computer's total is greater than the player's total, announce that the computer has won
  if (compDiceTotal > playerDiceTotal) {
    winner.innerText = 'The computer wins this round!';

    //If the computer rolled a double, double their points for this round and add that number to their running total
    if (compd1 === compd2) {
      doublepoints.innerText =
        'The computer also rolled a double, they get double points!';
      compPoints += compDiceTotal * 2;
    }

    //If the computer did not roll a double, add their dice total for this round to their running total
    else {
      compPoints += compDiceTotal;
    }
  }

  //If there is a tie, announce it and don't give anyone points
  if (playerDiceTotal === compDiceTotal) {
    winner.innerText = "It's a tie. Nobody wins this round!";
  }

  //Update which buttons display, and display each player's points, after the first round
  continueButton.style.display = 'block';
  startOverButton.style.display = 'block';
  rollDiceButton.style.display = 'none';
  playerPointsDisplay.innerText = 'Player Points: ' + playerPoints;
  compPointsDisplay.innerText = 'Computer Points: ' + compPoints;

  //If the player's running total hits 100 or more, end the game and announnce that they have won
  if (playerPoints >= 100) {
    finalwinner.innerText = 'You reached 100 points first. You win!!! :)';
    continueButton.style.display = 'none';
  }

  //If the computer's running total hits 100 or more, end the game and announnce that the play has lost
  if (compPoints >= 100) {
    finalwinner.innerText =
      "The computer reached 100 points first. You lost! :'(";
    continueButton.style.display = 'none';
  }
}

//Function for the Start Over button to reset all variables, clear out any game text, and hide and show the appropriate buttons
function startOver() {
  restartIcons();

  playerPoints = 0;
  compPoints = 0;

  let items = [
    playerStatus,
    playerPointsDisplay,
    compStatus,
    compPointsDisplay,
    winner,
    doublepoints,
    finalwinner,
  ];

  items.forEach(clearHTML);

  function clearHTML(item) {
    item.innerText = '';
  }

  continueButton.style.display = 'none';
  startOverButton.style.display = 'none';
  rollDiceButton.style.display = 'inline-block';
}

//Function to update the dice images being displayed
function updateIcons(icon1, icon2, d1, d2) {
  var imageP1 = icon1;
  var imageP2 = icon2;
  imageP1.src = 'static/images/dice' + d1 + '.png';
  imageP2.src = 'static/images/dice' + d2 + '.png';
}

//Function to replace all die icons with dice6 when game is started over
function restartIcons() {
  document.querySelectorAll('img').forEach(function (item) {
    item.src = 'static/images/dice6.png';
  });
}
