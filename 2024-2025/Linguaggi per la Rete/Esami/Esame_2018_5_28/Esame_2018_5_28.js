let N = 5;
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
document.body.appendChild(display);