/*let N = 5;
let score = 0;
let simboli = {"grass.png": 0, "head.png": 100, "rear.png": -200};

function createGame(){
    let immagini = document.createElement("img");
    immagini.setAttribute("src", Object.keys(simboli)[0]);
    immagini.addEventListener("click", function(){
        score += simboli[immagini.getAttribute("src")];
        display.innerHTML = score;

        if(score < 0)
            display.innerHTML = "Fai pena";
        if(score >= 1000)
            document.body.innerHTML = "wow";
    });
    setInterval(function(){immagini.setAttribute("src", Object.keys(simboli)[Math.floor(Math.random()*3)]);}, 1000);
    document.body.appendChild(immagini);
}


for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++){
        createGame();
    }
    document.body.appendChild(document.createElement("br"));
}
let display = document.createElement("div");
document.body.appendChild(display);*/


let N = 5; //dimensione terreno gioco
let score = 0; //punteggio
let figure = {"head.png": 100, "grass.png" : 0, "rear.png" : -200};

function gioco(){
    let elementi_gioco = document.createElement("img"); //inserisco nel DOM le immagini
    elementi_gioco.setAttribute("src", Object.keys(figure)[0]); //assegno a ongi immagine del DOM quella del dizionario con il suo valore

    elementi_gioco.addEventListener("click", function(){
        score += figure[elementi_gioco.getAttribute("src")]; //incrememtno lo score con il valore presente nell'immagine nel DOM
        display.innerHTML = score;

        if(score < 0)
            display.innerHTML = "hai perso";
        if(score >= 1000)
            display.innerHTML = "hai vinto";
    });
    setInterval(function(){elementi_gioco.setAttribute("src", Object.keys(figure)[Math.floor(Math.random()*3)]);}, 1000);
    document.body.appendChild(elementi_gioco);
}

for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++){
        gioco();
    }
    document.body.appendChild(document.createElement("br"));
}
let display = document.createElement("div");
document.body.appendChild(display);

