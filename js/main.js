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
// *
// * La funzione restituisce il valore della select "difficulty"
// *
function getSelectValue() {
    var selectedValue = document.getElementById("difficulty").value;
    if (selectedValue == 0) {
        cellPerRow = 10;
    } else if (selectedValue == 1) {
        cellPerRow = 9;
    } else if (selectedValue == 2) {
        cellPerRow = 5;
    }
    return cellPerRow;
}
// 
// 
// 
// 
// buttons
var play = document.getElementById("play");
var playAgain = document.getElementById("play-again");
// cell per row
var cellPerRow = getSelectValue();
// fieldId
var fieldId = document.getElementById("minefield");
// cells
var cells = 0;
// cellClass
var cellClass = "cell";
// bombs
var bombs = [];
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

// *
// *play event
// *
play.addEventListener("click",
    function() {
        // *Campo minato
        console.log(cellPerRow);
        cells = cellPerRow * cellPerRow;
        while (bombs.length < 16) {
            var bombN = getRndInteger(1, cells);
            if(bombs.includes(bombN) == false) {
                bombs.push(bombN);
            }
        }
        console.log(cells);
        console.log("bombs", bombs);
        createMinefield(cellPerRow, fieldId, cellClass, rowClass);
        document.getElementById("difficulty-form").classList.add("display--none");
        document.getElementById("wrapper-minefield").classList.add("display--block");
    }
);

// *
// *play-again event
// *
playAgain.addEventListener("click",
function() {                
    location.reload(); 
}
);
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
            document.getElementById("endId").classList.add("display--flex-end");
            document.getElementById("end-game__message").innerHTML = `"Hai perso! <br> Il tuo punteggio è di ${validNumb.length}" <br> (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ`; 
            // event.target.disabled = true;
            for(let i = 1; i<=cells; i++) {
                if(bombs.includes(i)) {
                    console.log(celle[i]);
                    console.log(i);
                    celle[i - 1].classList.add(addClassToCell);
                }
            }             

        } else if (validNumb.includes(numClicked)) {
            event.target.disabled = true;
            alert("Attenzione hai già cliccato su questa cella");

        } else {
            event.target.classList.add(addClassYellow);
            validNumb.push(numClicked);
            if(validNumb.length == (cells - bombs.length)) {
                event.target.classList.add(addClassToCell);
                // alert("Hai vinto");
                document.getElementById("endId").classList.add("display--flex-end");
                document.getElementById("end-game__message").innerHTML = `	╭( ･ㅂ･)و ̑̑ ＂ <br> ̑̑ "Hai vinto" ╭( ･ㅂ･)و ̑̑ ＂<br>`; 
            }
        }
    }
);
