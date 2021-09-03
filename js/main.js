// *
// * La funzione aggiunge tanti elementi quanto il valore di "cellNumb" alla griglia "getFieldId", 
// * stabiliti la classe css delle celle "cellClass".
// * Al click l'aspetto delle celle varia in base alla clasae "addClassToCell"
// *
function createMinefield(cellNumb, getFieldId, getcellClass, getRowClass) {
    var n = 1;
    for (let i = 0; i< cellNumb; i++) {
        getFieldId.innerHTML += `<div class=${getRowClass}></div>`;
        for (let j = 1; j<= cellNumb; j++) {        
            document.getElementsByClassName(getRowClass)[i].innerHTML += `<div class=${getcellClass}><span class="cell-n">${n}</span></div>`;
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
// rowClass
var rowClass = "row";
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
while (bombs.length < 16) {
    var bombN = getRndInteger(1, cells);
    if(bombs.includes(bombN) == false) {
        bombs.push(bombN);
    }
}
// for(let i=0; i<16; i++) {
// }
console.log("bombs", bombs);
// *
// *Campo minato
// *
createMinefield(cellPerRow, fieldId, cellClass, rowClass);
// *
// * evento click
// *
celle = document.getElementsByClassName("cell-n");
var validNumb = [];
fieldId.addEventListener("click", 
    function(event) {
        // clicked.push(event.target.innerHTML);
        var numClicked = parseInt(event.target.innerHTML);
        if(bombs.includes(numClicked)) {
            // for(let i = 0; i<cells; i++) {
            //     if(bombs.includes(i + 1)) {
            //         celle[i].classList.add(addClassYellow);
            //     }
            // }            
            alert(`Hai perso! Hai totalizzato un punteggio di ` + validNumb.length);
            window.location.reload();
        } else if (validNumb.includes(numClicked)) {
            event.target.disabled = true;
            alert("Attenzione hai già cliccato su questa cella");

        } else {
            event.target.classList.add(addClassToCell);
            validNumb.push(numClicked);
            if(validNumb.length == (cells - bombs.length)) {
                event.target.classList.add(addClassToCell);
                alert("Hai vinto");
                window.location.reload();  
            }
        }
    }
);

