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
            // cellIndex.push(n);
            n++;
        }  
    }   
}
    

// UserInput
var userNumb = parseInt(prompt(`Definisci il numero di celle per riga di cui sarà composto il campo da gioco 
(minimo 1, massimo 10)`));
// UserInput Control
while (userNumb<1 || userNumb>10 || isNaN(userNumb)) {
    userNumb = parseInt(prompt(`Errore! Definisci il numero di celle per riga di cui sarà composto il campo da gioco 
(minimo 1, massimo 10)`));   
}
// fieldId
var fieldId = document.getElementById("minefield");
// cellClass
var cellClass = "cell";
//  class added
var addClassToCell = "bg--red";
//cellIndex
var cellIndex = [];
for(let i=0; i<cells; i++) {
    cellIndex.push(i +1);
}
// mines
var mines = [1, 4, 5];

// Campo minato
createMinefield(userNumb, fieldId, cellClass, addClassToCell);

// evento click
celle = document.getElementsByClassName("cell-n");
for (let i=0; i< celle.length; i++) {
    celle[i].addEventListener("click",
        function(event) {
            if(mines.includes(i)) {
                celle[i].classList.add(addClassToCell);
            } else {
                celle[i].style.backgroundColor = "yellow";
            }
        }
    );
}