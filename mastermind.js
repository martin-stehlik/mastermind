/* Colors for each number in input */ 
const colorsForNumbers = ['#7FDBFF', '#3D9970', '#FFDC00', '#FF4136', '#B10DC9', '#0074D9', '#01FF70', '#FF851B', '#DDD'];

/* solution number generation */
const solution = [];
let submittedSolution;
for(let i=0; i<4; i++){
  solution.push(randomIntToNine());
}

/* current row index */ 
let currentRow = 0;

/* on input - change background color according to number */ 
const inputCircles = document.querySelectorAll('#js-control input');

for(let i=0; i<inputCircles.length; i++){
  inputCircles[i].addEventListener('input', function(event){
    this.style.backgroundColor = colorsForNumbers[event.target.value - 1];
    if (event.target.value == ''){
      this.style.backgroundColor = '#FFF';
    }
  });
}

// FUNCTIONS 

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
    alert("Congrats!");
  }
}

// return random integer between 1 and 9 
function randomIntToNine() {
  return Math.floor(Math.random() * 9) + 1;
}




