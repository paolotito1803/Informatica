/*function createRow(nameText, ingredientsText, priceText, total){
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
}*/


function createRow(nome, ingrediente, prezzo, totale){
    let riga = document.createElement("td");
    riga.innerHTML = nome;
    riga.addEventListener("mouseover", function(){riga.innerHTML = ingrediente;});
    riga.addEventListener("mouseout", function(){riga.innerHTML = nome;});
    let price = document.createElement("td");
    price.innerHTML = prezzo;
    price.addEventListener("click", function(){totale.innerHTML = parseFloat(totale.innerHTML) + parseFloat(prezzo)})
    let tr = document.createElement("tr");
    tr.appendChild(riga);
    tr.appendChild(price);

    return tr;
}


let menu = document.getElementsByClassName("menu");
while(menu.length > 0){
  let elmenu = menu[0];
  let table = document.createElement("table");
  let tot = document.createElement("div");
  tot.innerHTML = "0";
  elmenu.parentNode.insertBefore(table, elmenu);
  elmenu.parentNode.insertBefore(tot, elmenu);
  elmenu.parentNode.removeChild(elmenu);

  let test = elmenu.getElementsByTagName("div");
  while(test.length > 0){
    let pizza = test[0].textContent.split(";");
    table.appendChild(createRow(pizza[0], pizza[1], pizza[2], tot));
    elmenu.removeChild(test[0]);
  } 
}
