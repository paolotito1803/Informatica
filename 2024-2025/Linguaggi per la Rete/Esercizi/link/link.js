function dividiFrase(){
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

dividiFrase();

