import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-rechazar-solicitud',
  templateUrl: './rechazar-solicitud.component.html',
  styleUrls: ['./rechazar-solicitud.component.css']
})
export class RechazarSolicitudComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: SolicitudService,
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
        if (datos.id && datos.Oferta_economica) {
          this.listaDatos.push(datos.id?.toString());
          this.id = datos.id;
        }
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

  rechazarRegistro() {
    let id = this.id;
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        
        datos.estadoId = 3;
        this.servicio.ModificarRegistro(datos).subscribe(
          (datos) =>{
            alert("Registro rechazado correctamente.");
            this.router.navigate(["/seguridad/aceptar-solicitudes"]);
          },
          (err) =>{
            alert("Error rechazado el registro");
          }
        );
        this.router.navigate(["/seguridad/aceptar-solicitudes"]);
      },
      (err) => {
        alert("Error rechazando el registro");
      }
    );
  }

}
