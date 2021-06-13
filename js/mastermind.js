var colorsForNumbers = ['#7FDBFF', '#3D9970', '#FFDC00', '#FF4136', '#D073DE', '#0074D9', '#01FF70', '#FF851B', '#DDD'];

var solution;
var submittedSolution;
var currentRow;

initialSetup();

var inputCircles = document.querySelectorAll('#js-control input');
for (var i = 0; i < inputCircles.length; i++) {
    inputCircles[i].addEventListener('input', function (event) {
        if (event.target.value == 0) {
            this.value = "";
            return false;
        } else if (event.target.value.length > 1) {
            this.value = this.value.charAt(1);
        }
        this.style.backgroundColor = colorsForNumbers[event.target.value - 1];
        var nextElement = this.nextElementSibling;
        nextElement.focus();
    });

    inputCircles[i].addEventListener('change', function (event) {
        if (event.target.value == "") {
            this.style.backgroundColor = '#FFF';
        }
    });
}

var buttons = document.querySelectorAll('#js-control button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        submitSolution(this);
    });
}

function initialSetup() {
    solution = [];
    for (var i = 0; i < 4; i++) {
        solution.push(randomIntToNine());
    }

    currentRow = 0;
    var inputCircles = document.querySelectorAll('#js-control input');

    /* initial number input */
    for (var i = 0; i < inputCircles.length; i++) {
        inputCircles[i].value = null;
        inputCircles[i].style.backgroundColor = "#FFF";
        inputCircles[i].removeAttribute('disabled');
    }

    /* initial buttons */
    var buttons = document.querySelectorAll('#js-control button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
    }

    /* initial results */
    var resultCircles = document.querySelectorAll('#js-results .circle-small');
    for (var i = 0; i < resultCircles.length; i++) {
        resultCircles[i].style.backgroundColor = "#FFF";
    }

    autofocusInput();

}

function submitSolution(button) {
    button.disabled = true; // disable used button
    var circles = button.parentNode.querySelectorAll("#js-control input");
    currentRow = Array.prototype.indexOf.call(button.parentNode.parentNode.children, button.parentNode); // find current row index based on button position
    submittedSolution = [];
    for (var i = 0; i < solution.length; i++) {
        submittedSolution.push(circles[i].value);
        circles[i].disabled = "true"; // disable used input circles
    }
    computePoints();
    autofocusInput();
};

function computePoints() {
    var compResult = solution.slice();
    for (var i = 0; i < solution.length; i++) {
        if (compResult[i] == submittedSolution[i]) {  // == operator is necessary
            compResult[i] = "accurate";
            submittedSolution[i] = "accurate";
        }
    }
    for (var i = 0; i < solution.length; i++) {
        for (var y = 0; y < solution.length; y++) {
            if (compResult[i] == submittedSolution[y] && compResult[i] !== "accurate") {
                compResult[i] = "inaccurate";
                submittedSolution[y] = "inaccurate";
            }
        }
    }
    var signs = {};
    signs.accurate = 0;
    signs.inaccurate = 0;
    submittedSolution.forEach(el => {
        if (el == "accurate") {
            signs.accurate++;
        } else if (el == "inaccurate") {
            signs.inaccurate++;
        }
    });
    showSigns(signs);
}

function showSigns(signs) {
    var smallCircles = document.querySelector(".results").querySelectorAll(".row")[currentRow].querySelectorAll(".circle-small");
    for (var i = 0; i < signs.accurate; i++) {
        smallCircles[i].style.backgroundColor = "#2ECC40";
    }
    for (var i = 0 + signs.accurate; i < (signs.inaccurate + signs.accurate); i++) {
        smallCircles[i].style.backgroundColor = "#AAA";
    }
    if (signs.accurate === 4) {
        setTimeout(function () {
            alert("Congrats! The code is " + solution.join("") + ".");
        }, 1000);
    }
}

function toggleInst(button) {
    var instructions = document.querySelector("#js-instructions");
    instructions.classList.toggle("instructions-display");
    if (button.textContent === "How to play") {
        button.textContent = "Close instructions";
    } else {
        button.textContent = "How to play";
    }
}

function randomIntToNine() {
    return Math.floor(Math.random() * 9) + 1;
}

function autofocusInput() {
    var focusableInput = document.querySelector("#js-control input:not([disabled])");
    focusableInput.focus();
}
