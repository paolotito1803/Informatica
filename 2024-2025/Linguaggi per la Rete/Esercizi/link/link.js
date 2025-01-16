/*function dividiFrase(){
    const  frase = document.getElementById("paragrafo");
     // Otteniamo il contenuto del paragrafo come testo const testo
    let parole = frase.textContent.split(" "); 
    frase.innerHTML = "";

    for(parola of parole){
        let link = document.createElement("a");
        link.setAttribute("href", 'https://it.wikipedia.org/wiki/${parola}');
        link.setAttribute("target", '_blank');
        link.textContent = parola;
        frase.appendChild(link);
        frase.appendChild(document.createTextNode(" "));
    }
}

dividiFrase();*/
/*
let frase = document.getElementsByClassName("paragrafo");
for(let i = 0; i < frase.length; i++){
    let frasi = frase[i];
    let parola = frasi.textContent.split(" ");
    frasi.textContent = "";
    //document.body.appendChild(frase);
    for(parole of parola){
        let link = document.createElement("a");
        link.setAttribute("href", 'https://it.wikipedia.org/wiki/${parola}');
        link.setAttribute("target", '_blank');
        link.textContent = parole;
        frasi.appendChild(link);
        frasi.appendChild(document.createTextNode(" "));

    }
}*/

/*let frasi = document.getElementsByClassName("paragrafo");
while(frasi.length > 0){
    let frase = document.createElement("p");
    document.body.appendChild(frase);
    frase.textContent = frasi[0];
    let parole = frasi[0].textContent.split(" ");
    frasi[0].textContent = "";
    frase.textContent = "";
    for(parola of parole){
        let link = document.createElement("a");
        link.setAttribute("href", 'https://it.wikipedia.org/wiki/${parola}')
        link.setAttribute("target", '_blank');
        link.textContent = parola;
        frase.appendChild(link);
    }
    document.body.removeChild(frasi[0]);
}*/

let frasi = document.getElementsByClassName("paragrafo");
while(frasi.length > 0){
    let frase = document.createElement("p");
    document.body.appendChild(frase);
    frase.textContent = frase[0];
    let parole = frasi[0].textContent.split(" ");
    frase.innerHTMl = "";
    frasi[0].innerHTML = "";
    for(parola of parole){
        let link = document.createElement("a");
        link.setAttribute("href", 'https://it.wikipedia.org/wiki/${parola}');
        link.setAttribute("target", '_blank');
        link.innerHTML = parola;
        frase.appendChild(link);
        frase.appendChild(document.createTextNode(" "));
    }

    document.body.removeChild(frasi[0]);
}