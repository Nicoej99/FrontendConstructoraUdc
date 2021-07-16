import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-eliminiar-inmueble',
  templateUrl: './eliminiar-inmueble.component.html',
  styleUrls: ['./eliminiar-inmueble.component.css']
})
export class EliminiarInmuebleComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: InmuebleService,
    private router: Router,
    private route: ActivatedRoute ) {


   }

   

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        if (datos.id && datos.identificador) {
          this.listaDatos.push(datos.id?.toString());
          this.listaDatos.push(datos.identificador);
          this.id = datos.id;
        }
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

  EliminarRegistro() {
    let id = this.id;
    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("Registro eliminado correctamente.");
        this.router.navigate(["/parametros/listar-inmueble"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    );
  }


}
