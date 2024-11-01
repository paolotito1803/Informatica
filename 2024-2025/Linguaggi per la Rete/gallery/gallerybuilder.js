function button(text, func){ // funzione d'appoggio per creare i bottoni
    let button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value", text);
    button.addEventListener("click",func); // associo la funzione voluta all'evento di click
    return button;
}


function createGallery(g){ // g corrisponde al div dell'html
    let images = g.getElementsByTagName("img"); // estrae le immagini dall'html come fosse una collezione di immagini
    let s = []; // salvo i sorgenti delle immagini

    while(images.length > 0){
        s.push(images[0].getAttribute("src"));
        g.removeChild(images[0]); // rimuove l'immagine da images e lo ritorna
    }

    // a questo punto tutte le immagini dei div sono stati rimossi

    let img = document.createElement("img"); // crea l'elemento img nel proxy
    let i = 0;
    img.setAttribute("src",s[i]); // imposto l'src al primo elemento delle immgini precedentemente tolte

    g.appendChild(button("<-",function(){ // aggiunge all'html l'immagine con le freccia indietro
        img.setAttribute("src",s[i = i - 1 >= 0 ? i-1 : s.length-1]);
    }));

    g.appendChild(img); // aggiunge l'immagine all'html

    g.appendChild(button("->",function(){ // aggiunge all'html l'immagine con le freccia avanti
        img.setAttribute("src",s[i = (i + 1) % s.length]);
    }));
}

let leftalignedDivs = document.querySelectorAll('div>img'); // ritorna tutti i div con quel attributo presenti nel documento
let scoreElement = document.getElementById("score");
scoreElement.textContent = "test";
var body = document.getElementsByTagName("Body")[0]; // ritorna un HTMLCollection con tutti gli elementi presenti nel body
let galleries = body.getElementsByClassName("gallery"); // gallery è il nome dato alla classe nell'html ricavabile anche dal body
for(let gallery = 0; gallery < galleries.length; gallery++)
    createGallery(galleries[gallery]);