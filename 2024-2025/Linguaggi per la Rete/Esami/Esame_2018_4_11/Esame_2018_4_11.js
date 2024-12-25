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

/*
function createRow(nome, ingrediente, prezzo, totale){
  let riga = document.createElement("td");
  riga.innerHTML = nome;
  riga.addEventListener("mouseover", function(){riga.innerHTML = ingrediente;});
  riga.addEventListener("mouseout", function(){riga.innerHTML = nome});
  let price = document.createElement("td");
  price.innerHTML = prezzo;
  price.addEventListener("click", function(){totale.innerHTML = parseFloat(totale.innerHTML) + parseFloat(prezzo);});
  let tr = document.createElement("tr");
    tr.appendChild(riga);
    tr.appendChild(price);

  return tr;
}

let menu = document.getElementsByClassName("menu");
while(menu.length > 0){
  let table = document.createElement("table");
  let tot = document.createElement("div");
  let elem_menu = menu[0];
  tot.innerHTML = "0";
  elem_menu.parentNode.insertBefore(table, elem_menu);
  elem_menu.parentNode.insertBefore(tot, elem_menu);
  elem_menu.parentNode.removeChild(elem_menu);

  //ho portato su tutto <div>Gustosa;pomodoro, mozzarella, salame piccante, ricotta;7.00</div>, ora devo gestire gli ingredienti e il prezzo
  let ingredienti = elem_menu.getElementsByTagName("div"); //prendo ongi cosa all'interno dei singli div degli ingredienti
  while(ingredienti.length > 0){ //scorro il contenuto dei div per separare ingredienti e costo e inserirli nel posto corretto
    let pizze = ingredienti[0].textContent.split(";");
    table.appendChild(createRow(pizze[0], pizze[1], pizze[2], tot));
    elem_menu.removeChild(ingredienti[0]);
  }
}*/

function createTabel(nome, ingrediente, prezzo, totale){
  let riga = document.createElement("td");
  let price = document.createElement("td");
  riga.innerHTML = nome;
  price.innerHTML = prezzo;
  riga.addEventListener("mouseover", function(){riga.innerHTML = ingrediente;});
  riga.addEventListener("mouseout", function(){riga.innerHTML = nome;});
  price.addEventListener("click", function(){totale.innerHTML = parseFloat(totale.innerHTML) + parseFloat(prezzo);});
  let colonna = document.createElement("tr");
  colonna.appendChild(riga);
  colonna.appendChild(price);

  return colonna;
}


let menu = document.getElementsByClassName("menu");
while(menu.length > 0){
  let tabella = document.createElement("table");
  let total = document.createElement("div");
  total.innerHTML = "0";
  let menus = menu[0]; //prendo il primo menu
  menus.parentNode.insertBefore(tabella, menus);
  menus.parentNode.insertBefore(total, menus);

  menus.parentNode.removeChild(menus);

  let ingredienti = menus.getElementsByTagName("div");
  while(ingredienti.length > 0){
    let pizza = ingredienti[0].textContent.split(";");
    tabella.appendChild(createTabel(pizza[0], pizza[1], pizza[2], total));
    menus.removeChild(ingredienti[0]);
  }
}