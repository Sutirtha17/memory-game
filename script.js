const gameContainer = document.getElementById('game');

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

let previous;
let previousColor;
let wait = false;
let numberOfMatches = 0;
let totalPoints = 10;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      wait = false;
      resolve();
    }, ms)
  );
}

function handleStart() {
  if (document.getElementById('btn').innerHTML === 'restart') {
    window.location.reload();
    document.getElementById('btn').innerHTML == 'restart';
  }
  let mainDiv = document.getElementById('game');
  mainDiv.classList.remove('non-active');
  document.getElementById('btn').disabled = true;
}

async function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const className = event.target.className;

  if (!wait) {
    if (this === previous) {
      return;
    }
    if (!previousColor) {
      this.style.backgroundColor = `${className}`;
      previousColor = className;
      previous = this;
    } else {
      if (previousColor !== className) {
        this.style.backgroundColor = `${className}`;
        if (totalPoints > 0) {
          totalPoints -= 1;
        }
        wait = true;
        await sleep(1000);
        previous.style.backgroundColor = 'white';
        this.style.backgroundColor = 'white';
      } else {
        this.style.backgroundColor = `${className}`;
        numberOfMatches += 1;
        wait = true;
        await sleep(0);
      }
      previousColor = undefined;
      previous = undefined;
    }
  }
  if (numberOfMatches == 5) {
    alert('You Won!');
    document.getElementById('btn').innerHTML = 'restart';
    document.getElementById('btn').disabled = false;
    const newDiv = document.createElement('div');
    newDiv.innerHTML = 'Total Point is ' + totalPoints;
    newDiv.classList.add('displayResult');
    gameContainer.parentNode.insertBefore(newDiv, gameContainer.nextSibling);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
