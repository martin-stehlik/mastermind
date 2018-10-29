/* Colors for each number in input */ 
const colorsForNumbers = ['#7FDBFF', '#3D9970', '#FFDC00', '#FF4136', '#B10DC9', '#0074D9', '#01FF70', '#FF851B', '#DDD'];

/* solution number generation */
let solution;
let submittedSolution;
let currentRow;

initialSetup();

function initialSetup(){
  solution = [];
  for(let i=0; i<4; i++){
    solution.push(randomIntToNine());
  }

  currentRow = 0;

  
  const inputCircles = document.querySelectorAll('#js-control input');

  /* initial number input */ 
  for(let i=0; i<inputCircles.length; i++){
    inputCircles[i].value = null;
    inputCircles[i].style.backgroundColor = "#FFF";
    inputCircles[i].removeAttribute('disabled');

    /* on input - change background color according to number */ 
    inputCircles[i].addEventListener('input', function(event){
      this.style.backgroundColor = colorsForNumbers[event.target.value - 1];
      if (event.target.value == ''){
        this.style.backgroundColor = '#FFF';
      }
    });
  }

  /* initial buttons */ 
  const buttons = document.querySelectorAll('#js-control button');
  for(let i=0; i<buttons.length; i++){
    buttons[i].removeAttribute('disabled');
  }

  /* initial results */ 
  const resultCircles = document.querySelectorAll('#js-results .circle-small');
  for(let i=0; i<resultCircles.length; i++){
    resultCircles[i].style.backgroundColor = "#FFF";
  }

} // end of initial setup function 


// OTHER FUNCTIONS 

// Submit solution (on button click)
function submitSolution(button){
  button.disabled = true; // disable used button 
  let circles = button.parentNode.querySelectorAll("#js-control input");
  currentRow = Array.prototype.indexOf.call(button.parentNode.parentNode.children, button.parentNode); // find current row index based on button position
  submittedSolution = [];
  for (let i=0; i<solution.length; i++){
    submittedSolution.push(circles[i].value); 
    circles[i].disabled = "true"; // disable used input circles
  }
  computePoints();
};

// compare given numbers with solution 
function computePoints (){
  let compResult = solution.slice();
  for (let i=0; i<solution.length; i++) {
    if (compResult[i] == submittedSolution[i]) {  // == operator is necessary 
      compResult[i] = "accurate";
      submittedSolution[i] = "accurate";
    }
  }
  for (let i=0; i<solution.length; i++){
    for (let y=0; y<solution.length; y++){
      if(compResult[i] == submittedSolution[y] && compResult[i] !== "accurate"){
        compResult[i] = "inaccurate";
        submittedSolution[y] = "inaccurate";
      }
    }
  }
  let signs = {};
  signs.accurate = 0;
  signs.inaccurate = 0;
  submittedSolution.forEach(el => {
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
    setTimeout(function(){
      alert("Congrats! The code is " + solution.join("") + "."); 
    }, 500);
  }
}

/* show/hide game instructions*/ 
function toggleInst(button){
  const instructions = document.querySelector("#js-instructions");
  instructions.classList.toggle("instructions-display");
  if (button.textContent === "How to play"){
    button.textContent = "Close instructions";
  } else {
    button.textContent = "How to play";
  }
}

// return random integer between 1 and 9 
function randomIntToNine() {
  return Math.floor(Math.random() * 9) + 1;
}




