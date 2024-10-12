function button(text, func){ // funzione d'appoggio per creare i bottoni
    let button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value", text);
    button.onclick = func; // associo la funzione voluta a onclick
    return button;
}


function createGallery(g){ // g corrisponde al div dell'html
    let images = g.getElementsByTagName("img"); // estrae le immagini dall'html come fosse una collezione di immagini
    let s = []; // salvo i sorgenti delle immagini

    while(images.length > 0){
        s.push(images[0].getAttribute("src"));
        g.removeChild(images[0]); // rimuove l'immagine da images e lo ritorna
    }

    let img = document.createElement("img"); // crea l'elemento img nel proxy
    let i = 0;
    img.setAttribute("src",s[i]); // imposto l'src al primo elemento delle immgini precedentemente tolte

    g.appendChild(button("<-",function(){ // aggiunge all'html l'immagine con le freccia indietro
        img.setAttribute("src",s[i = i - 1 >= 0 ? i-1 : s.length-1]);
    }));

    g.appendChild(img);

    g.appendChild(button("->",function(){ // aggiunge all'html l'immagine con le freccia avanti
        img.setAttribute("src",s[i = (i + 1) % s.length]);
    }));
}

let galleries = document.getElementsByClassName("gallery"); // gallery è il nome dato alla classe nell'html
for(let gallery = 0; gallery < galleries.length; gallery++)
    createGallery(galleries[gallery]);
// a questo punto tutte le immagini dei div sono stati rimossi