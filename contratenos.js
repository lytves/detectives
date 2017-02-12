function allowDrop(ev) {
    ev.preventDefault();
    if( ev.currentTarget.className.indexOf("over") == -1 ) {
        document.getElementById(ev.currentTarget.id).className += " over";
    }
}
function leave(ev) {
    if (ev.target.id == "plaza_arrastrar" || ev.target.id == "lista_detectives") {
        document.getElementById(ev.currentTarget.id).className = ev.currentTarget.id;
    }
}
function drag(ev) {
    var nuevos_datos = ev.target.id + "$$$" + ev.target.parentNode.id;
    ev.dataTransfer.setData("Text", nuevos_datos);
}
function drop(ev) {
    ev.preventDefault();
    var arr = ev.dataTransfer.getData("Text").split('$$$');
    var data = arr[0];
    var de_donde_id = arr[1];
    var target_id = ev.target.id;
    var element_id = document.getElementById(data).id;
    
    if (target_id != "plaza_arrastrar" && target_id != "lista_detectives"){
        var parent = ev.target.parentElement;
        parent.appendChild(document.getElementById(data));
        target_id = parent.id;
    } else {
        ev.target.appendChild(document.getElementById(data));
    }
    
    //Aqui vemos ID's de todos elementos que vamos a usar
    //console.log("drag de - " + de_donde_id);
    //console.log("drag el objeto - " + element_id);
    //console.log("drop a - " + target_id);
    
    if (de_donde_id != target_id) {
      if (target_id == "plaza_arrastrar") {
        document.getElementById("agentes").value++;
        
        var arr = element_id.split('_');
        document.getElementById("detectives").options[arr[1]-1].selected = true;
        contar();
      }
      if (target_id == "lista_detectives") {
        document.getElementById("agentes").value--;
        
        var arr = element_id.split('_');
        document.getElementById("detectives").options[arr[1]-1].selected = false;
        contar();
      }    
    }
    document.getElementById(ev.currentTarget.id).className = ev.currentTarget.id; 
}
function contar() {
    var cantidad = parseInt(document.getElementById("agentes").value);
    if (isNaN(cantidad)) {
      cantidad = document.getElementById("plaza_arrastrar").childElementCount;
      document.getElementById("agentes").value = cantidad;
    }
    var dias = parseInt(document.getElementById("dias").value);
    if (isNaN(dias)) {
      dias = 1;
      document.getElementById("dias").value = dias;
    }

    var nuevo_precio = cantidad * dias * 250;
    
    if (dias >= 7 && dias < 14) {
        nuevo_precio = nuevo_precio * 0.8;
    } else if (dias >= 14 && dias < 32) {
        nuevo_precio = nuevo_precio * 0.6;
    } else if (dias >= 365) {
        nuevo_precio = nuevo_precio * 0.4;
    }
    
    if (cantidad == 2) {
        nuevo_precio = nuevo_precio * 0.8;
    } else if (cantidad == 3) {
        nuevo_precio = nuevo_precio * 0.6;
    } else if (cantidad > 3) {
        nuevo_precio = nuevo_precio * 0.4;
    }
        
    document.getElementById("precio").innerHTML = nuevo_precio;
}
function limpiarForma() {
  document.getElementById("dias").value = 1;
  document.getElementById("precio").innerHTML = "0";
  document.getElementById("lista_detectives").innerHTML += document.getElementById("plaza_arrastrar").innerHTML;
  document.getElementById("plaza_arrastrar").innerHTML = "";
  
}
