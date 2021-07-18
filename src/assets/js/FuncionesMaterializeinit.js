document.addEventListener('DOMContentLoaded', function () {
  var elemss = document.querySelectorAll('.sidenav');
  var instancess = M.Sidenav.init(elemss, {});
});

function agregarCiudades(x) {
  
  console.log("-------------------------")
  nombre = `<h3>hola</h3>`

  console.log(document.getElementById("miSelect"))
  for (var i = 0; i < x.length; i++) {
    nombre = `<select id="" >
                <option value="" disabled selected>Países</option>
                <option value="0" >europa</option>
                <option value="1" >alemania</option>
              </select>
              <label>Elige tu país</label>
              <br>`
    document.getElementById("miSelect").insertAdjacentHTML('beforeend', nombre)
  }



}

function inyectarCodigo(nombre, apellido) {
  nombre = `<h3>${nombre} ${apellido}</h3>`
  document.getElementById("caja").innerHTML = nombre;

}


function iniciarImagen() {
  console.log("entrarrrrrrrrrrrrrrrrr");
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
    console.log(primerArchivo.path);
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);
    // Y a la fuente de la imagen le ponemos el objectURL
    $imagenPrevisualizacion.src = objectURL;
  });
}


function iniciarSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}

function iniciarDesplegable() {
  var elemsd = document.querySelectorAll('.dropdown-trigger');
  var instancesd = M.Dropdown.init(elemsd, options);
}

function ObtenerRol() {
  var valor = document.getElementById("role").value;
  var aux = parseInt(valor)
  alert(valor);
  return aux;
}
