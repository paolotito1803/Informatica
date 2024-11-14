function createRow(nameText, ingredientsText, priceText, total){
    let riga = document.createElement("td");
    riga.innerHTML = nameText;
    riga.addEventListener("mouseover", function(){riga.innerHTML = ingredientsText;}); //se passo sopra mi mostra gli inggredienti
    riga.addEventListener("mouseout", function(){riga.innerHTML = nameText;});
    let prezzo =  document.createElement("td");
    prezzo.innerHTML = priceText;
    prezzo.addEventListener("click", function(){total.innerHTML = parseFloat(total.innerHTML) + parseFloat(priceText)});

    let tr = document.createElement("tr");
    tr.appendChild(riga);
    tr.appendChild(prezzo);

    return tr;
}

let menus = document.getElementsByClassName("menu"); //crea un array con gli elementi dei menu

while(menus.length > 0){ //ad ogni iterazione diminuisce la lunghezza
    let menu = menus[0];
    let table = document.createElement("table"); //tabella al posto del menu
    let total = document.createElement("div"); //elemento per il totale dei prezzi
    total.innerHTML = "0";
    menu.parentNode.insertBefore(table, menu); //metto la tabella prima del primo div casse perchè parent node è il body
    menu.parentNode.insertBefore(total, menu); //analogo solo che dopo la tabella
    menu.parentNode.removeChild(menu); //rimuove il primo menu alternativa menus[0].remove()

    let divis = menu.getElementsByTagName("div");
    while(divis.length > 0){
        let blocks = divis[0].textContent.split(";");
        table.appendChild(createRow(blocks[0], blocks[1], blocks[2], total));
         menu.removeChild(divis[0]); //elimino il primo div dentro la classe che ha come padre menu
    }
}
