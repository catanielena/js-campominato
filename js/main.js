// *
// * La funzione aggiunge tanti elementi quanto il valore di "cellNumb" alla griglia "getFieldId", 
// * stabiliti la classe css delle celle "cellClass".
// * Al click l'aspetto delle celle varia in base alla clasae "addClassToCell"
// *
function createMinefield(cellNumb, getFieldId, cellClass, addClassToCell) {
    var n = 1;
    for (let i = 0; i< cellNumb; i++) {
        getFieldId.innerHTML += `<div class="row"></div>`;
        for (let j = 1; j<= cellNumb; j++) {        
            document.getElementsByClassName("row")[i].innerHTML += `<div class=${cellClass}><span class="cell-n">${n}</span></div>`;
            n++;
        }  
    }   
}
// *
// * La funzione restituisce un numero randomico 
// *
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// UserInput
var difficulty = parseInt(prompt(`Indica il grado di difficoltà (0, 1, 2)`));
// UserInput Control
while (difficulty<0 || difficulty>2 || isNaN(difficulty)) {
    difficulty = parseInt(prompt(`Indica il grado di difficoltà (0, 1, 2)`)); 
}
var cellPerRow;
if (difficulty == 0) {
    cellPerRow = 10;
} else if (difficulty == 1) {
    cellPerRow = 9;
} else {
    cellPerRow = 5;
}

// fieldId
var fieldId = document.getElementById("minefield");
// cellClass
var cellClass = "cell";
// cells
var cells = cellPerRow * cellPerRow;
//  class added
var addClassToCell = "bg--red";
//  class added
var addClassYellow = "bg--yellow";
//cellIndex
var cellIndex = [];
for(let i=0; i<cells; i++) {
    cellIndex.push(i +1);
}
// bombs
var bombs = [];
for(let i=0; i<16; i++) {
    do {
        var bombN = getRndInteger(1, cells);
    } while (bombs.includes(bombN));
    bombs.push(bombN);
}
console.log("bombs", bombs);
// *
// *Campo minato
// *
createMinefield(cellPerRow, fieldId, cellClass, addClassToCell);
// *
// * evento click
// *
celle = document.getElementsByClassName("cell-n");
// score
var score = 0;
// clicked
var clicked = [];
for(let i=0; i< cells; i++) {
    clicked.push(0);
}
for (let i=0; i< cells; i++) {
    celle[i].addEventListener("click",
        function(event) {
            if(bombs.includes(i)) {
                // -
                // -
                // -
                // -
                if(confirm("Hai perso! Ritenta")){
                    window.location.reload();  
                }
                // -
                // -
                // -
                // -
            } else if (score == (cells - 16 - 1)) {
                                // -
                // -
                // -
                // -
                celle[i].classList.add(addClassToCell);
                alert("Hai vinto")
                // -
                // -
                // -
                // -
            } else {
                celle[i].classList.add(addClassToCell);
            }

            // cliccando 2 volte sulla cella il punteggio non viene incrementato
            clicked[i]++;
            if(clicked[i]>=2) {
                score = score;
                alert("Attenzione non è possibile cliccare due volte sulla stessa cella")
            } else {
                score++;
            }
            console.log("score", score);
        }
        );
}


