let innerElement = document.getElementById("inner");
let outerElement = document.getElementById("outer");
let goElement = document.getElementById("go");

// aggiungo eventi listener
/* 1mo modo: aggiungere onclick all'html (DA NON FARE!!!)
    2ndo modo: inserirlo in file js*/

goElement.addEventListener("click", function(e){
    e.target.innerHTML = "clicked";
    e.preventDefault(); // provoca che il browser non carichi altre pagine
});
innerElement.addEventListener("click", function(e){ // e indica l'evento da gestire
    console.log("Inner " + e);
    e.stopPropagation(); // posso bloccare la propagazione
});

outerElement.addEventListener("click", function(e){
    console.log("Outer " + e);
});

function documentHandler(e){
    console.log("document " + e);
    document.removeEventListener("click", documentHandler); // rimuove l'evento, ma ha bisogno di conoscere la funzione
}

document.addEventListener("click", documentHandler);
