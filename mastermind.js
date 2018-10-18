/* INITIAL SETUP */ 

/* solution number generation */
let solution = [];
for(let i=0; i<4; i++){
  solution.push(randomIntToNine());
}

let currentRow = 0;


/* Input colors */ 
const colorsForNumbers = ['#7FDBFF', '#3D9970', '#FFDC00', '#FF4136', '#B10DC9', '#0074D9', '#01FF70', '#FF851B', '#DDD'] 

const inputCircles = document.querySelectorAll('input');

for(let i=0; i<inputCircles.length; i++){
  inputCircles[i].addEventListener('input', function(event){
    this.style.backgroundColor = colorsForNumbers[event.target.value - 1];
  });
}


// FUNCTIONS 

// checkNumbers function - button 
function checkNumbers(button){
  button.disabled = true;  // temporary solution for game limitation
  let circles = button.parentNode.querySelectorAll("input");
  currentRow = Array.prototype.indexOf.call(button.parentNode.parentNode.children, button.parentNode);
  let submittedSolution = [];
  for (let i=0; i<solution.length; i++){
    submittedSolution.push(circles[i].value); 
  }
  computePoints(submittedSolution);
};

// compare given numbers with solution - colored points 
function computePoints (submittedSolution){
  let points = [];  // possible values of elements: "accurate", "inaccurate", undefined;
  for (let i=0; i<solution.length; i++) {
    if (submittedSolution[i] == solution[i]){
      points[i] = "accurate";
    }
    for (let y=0; y<solution.length; y++){
      if (submittedSolution[y] == solution[i] && points[i] == undefined){    // compare two different data types: strings from input and numbers from random int. function
        points[i] = "inaccurate";
        submittedSolution[y] = "used"; // make sure that one submitted number cannot be accepted twice 
      } 
    } 
  }  
  let = signs = {};
  signs.accurate = 0;
  signs.inaccurate = 0;
  points.forEach(el => {
    if (el == "accurate"){
      signs.accurate++;
    } else if (el == "inaccurate"){
      signs.inaccurate++;
    }
  });
  showSigns(signs);

}

// show colored signs according to the rate of success, plus alert in case of completion 
function showSigns(signs){
  let smallCircles = document.querySelector(".results").querySelectorAll(".row")[currentRow].querySelectorAll(".circle-small");
  for(let i=0; i<signs.accurate; i++){
    smallCircles[i].style.backgroundColor = "#2ECC40";
  }
  for(let i = 0 + signs.accurate; i < (signs.inaccurate + signs.accurate); i++){
    smallCircles[i].style.backgroundColor = "#AAA";
  }
  if (signs.accurate === 4){
    alert("Congrats!");
  }
}

// return random integer between 1 and 9 
function randomIntToNine() {
  return Math.floor(Math.random() * 9) + 1;
}




