document.addEventListener('DOMContentLoaded', function () {
  var elemss = document.querySelectorAll('.sidenav');
  var instancess = M.Sidenav.init(elemss, {});
});

function iniciarSelect() {
  var elemsciu = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elemsciu, {});
}

function iniciarDesplegable() {
  var elemsnav = document.querySelectorAll('.dropdown-trigger');
  var instancesv = M.Dropdown.init(elemsnav, {});
}


function informetorta(lista) {
console.log("***************")
console.log(lista)
console.log("******************")

  nombres = `<tr >
  <th>
      ${lista[2]}
  </th>
  <th>
    <div id="divChart">
    <canvas id="myChart${lista[3]}" width="200px" height="200px"></canvas>
    </div>

  </th>
</tr>`
  document.getElementById("tort").insertAdjacentHTML('beforebegin', nombres);
  var ctx = document.getElementById(`myChart${lista[3]}`).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ['Vendidos', 'Sin vender'],
      datasets: [{
        label: 'Num datos',
        data: [lista[0],lista[1]],
        backgroundColor: [
          'rgb(74, 135, 72,0.5)',
          'rgb(229, 89, 50,0.5)',
          'rgb(66, 134, 244,0.5)',
        ]
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  
}




function torta(solicitudes) {
  let grafica = new Map();
  let atributos = new Map();
  let lisss = []

  for (let i = 0; i < solicitudes.length; i++) {

    if (!grafica.has(solicitudes[i].clienteId)) {
      atributos = new Map();
      atributos.set("aceptado", 0);
      atributos.set("rechazado", 0);
      atributos.set("estudio", 0);
      lisss.push(solicitudes[i].clienteId)
      grafica.set(solicitudes[i].clienteId, atributos)
      if (solicitudes[i].estadoId == 1) {
        let a = grafica.get(solicitudes[i].clienteId).get("estudio") + 1
        grafica.get(solicitudes[i].clienteId).set("estudio", a)
      } else if (solicitudes[i].estadoId == 2) {
        let a = grafica.get(solicitudes[i].clienteId).get("aceptado") + 1
        grafica.get(solicitudes[i].clienteId).set("aceptado", a)
      } else if (solicitudes[i].estadoId == 3) {
        let a = grafica.get(solicitudes[i].clienteId).get("rechazado") + 1
        grafica.get(solicitudes[i].clienteId).set("rechazado", a)
      }
    } else {
      if (solicitudes[i].estadoId == 1) {
        let a = grafica.get(solicitudes[i].clienteId).get("estudio") + 1
        grafica.get(solicitudes[i].clienteId).set("estudio", a)
      } else if (solicitudes[i].estadoId == 2) {
        let a = grafica.get(solicitudes[i].clienteId).get("aceptado") + 1
        grafica.get(solicitudes[i].clienteId).set("aceptado", a)
      } else if (solicitudes[i].estadoId == 3) {
        let a = grafica.get(solicitudes[i].clienteId).get("rechazado") + 1
        grafica.get(solicitudes[i].clienteId).set("rechazado", a)
      }

    }

  }

  console.log("///////////////////////")

  console.log(grafica)
  console.log(lisss)

  console.log("///////////////////////")




  /*
    console.log(mapa);
    mapa.set("edad",21); // agregar o cambiar valor
    console.log(mapa.get("edad")); // obtener valor
    mapa.has("edada") // saber si tiene el atributo
    */

  for (let k = 0; k < lisss.length; k++) {

    nombres = `<tr >
                <th>
                    ${lisss[k]}
                </th>
                <th>
                  <div id="divChart">
                  <canvas id="myChart${k}" width="200px" height="200px"></canvas>
                  </div>
      
                </th>
              </tr>`
    document.getElementById("tort").insertAdjacentHTML('beforebegin', nombres);
    var ctx = document.getElementById(`myChart${k}`).getContext("2d");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ['Aceptado', 'Rechazado', 'Estudio'],
        datasets: [{
          label: 'Num datos',
          data: [`${grafica.get(lisss[k]).get("aceptado")}`, `${grafica.get(lisss[k]).get("rechazado")}`, `${grafica.get(lisss[k]).get("estudio")}`],
          backgroundColor: [
            'rgb(74, 135, 72,0.5)',
            'rgb(229, 89, 50,0.5)',
            'rgb(66, 134, 244,0.5)',
          ]
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}



function inyectarCodigo(nombre, apellido) {
  nombres = `<h3>${nombre} ${apellido} </h3>`
  document.getElementById("caja").insertAdjacentHTML('beforebegin', nombres);
}


function iniciarImagen() {
  const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
    $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

  $seleccionArchivos.addEventListener("change", () => {
    // Los archivos seleccionados, pueden ser muchos o uno
    const archivos = $seleccionArchivos.files;
    // Si no hay archivos salimos de la función y quitamos la imagen
    if (!archivos || !archivos.length) {
      $imagenPrevisualizacion.src = "";
      return;
    }
    // Ahora tomamos el primer archivo, el cual vamos a previsualizar
    const primerArchivo = archivos[0];
    console.log("-----------------------");
    console.log(primerArchivo);

    console.log("-----------------------");
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);

    console.log(objectURL)

    // Y a la fuente de la imagen le ponemos el objectURL
    $imagenPrevisualizacion.src = objectURL;
  });
}


function ObtenerRol() {
  var valor = document.getElementById("role").value;
  var aux = parseInt(valor)
  alert(valor);
  return aux;
}
