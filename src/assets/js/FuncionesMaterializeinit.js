document.addEventListener('DOMContentLoaded', function () {
  var elemss = document.querySelectorAll('.sidenav');
  var instancess = M.Sidenav.init(elemss, {});
});

function iniciarSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}

function iniciarDesplegable() {
  var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
}








function inyectarCodigo(nombre, apellido) {
  nombre = `<h3>${nombre} ${apellido}</h3>`
  document.getElementById("caja").innerHTML = nombre;

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
    console.log(primerArchivo.path);
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);
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
