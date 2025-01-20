let immagini = document.getElementsByTagName("img");
let frasi = document.getElementsByTagName("p");
let divis = document.getElementsByTagName("div");

for(let level = 6; level > 0; level--){
    let titoli = document.getElementsByTagName("h" + level);
    for(let i = 0; i < titoli.length; i++){
        let parole = titoli[i].textContent.split(" ");
        let titolo = document.createElement("h" + level);
        for(parola of parole){
            for(let j = parola.length; j > 0; j--){
                titolo[j].textContent = titolo[j].textContent + parola[j];
            }
        }
        document.body.insertBefore(titolo[i], titoli[i]);
        document.body.removeChild(titoli[i]);
    }
}

for(let i = 0; i < frasi.length; i++){
    let frase = document.createElement("p");
    let parole = frasi[i].textContent.split(" ");
    for(parola of parole){
        for(let j = parola.length; j > 0; j--){
            frase[j].textContent = frase[j].textContent + parola[j];
        }
    }
    document.body.insertBefore(frase[i], frasi[i]);
    document.body.removeChild(frasi[i]);
}

for(let i = 0; i < divis.length; i++){
    let divs = document.createElement("div");
    let parole = divis[i].textContent.split(" ");
    for(parola of parole){
        for(let j = parola.length; j > 0; j--){
            divs[j].textContent = divs[j].textContent + parola[j];
        }
    }
    document.body.insertBefore(divs[i], divis[i]);
    document.body.removeChild(divis[i]);
}

for(let i = 0; i < immagini.length; i++){
    immagini[i].weigth.setAttribute(immagini[i].wiegth/2);
    immagini[i].height.setAttribute(immagini[i].heigth/2);
}