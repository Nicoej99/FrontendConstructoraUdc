document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

function MenuDespl(){
  $( document ).ready(function(){
    $(".dropdown-trigger").dropdown();
    });
}

function iniciarSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}
function ObtenerRol(){
  var valor = document.getElementById("role").value;
  var aux = parseInt(valor)
  alert(valor);
  return aux;
}
