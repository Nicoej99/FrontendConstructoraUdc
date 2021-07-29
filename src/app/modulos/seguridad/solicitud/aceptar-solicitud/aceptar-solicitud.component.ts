import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-aceptar-solicitud',
  templateUrl: './aceptar-solicitud.component.html',
  styleUrls: ['./aceptar-solicitud.component.css']
})
export class AceptarSolicitudComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;
  idCliente: number = 0;

  constructor(
    private servicio: SolicitudService,
    private serviciocliente: ClienteService,
    private router: Router,
    private route: ActivatedRoute) {


  }



  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    let idCliente = this.route.snapshot.params["cid"];
    this.ObtenerRegistroPorId(id, idCliente);
  }



  ObtenerRegistroPorId(id: number, idCliente: number) {
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

    this.serviciocliente.BuscarRegistro(idCliente).subscribe(
      (datosc) => {
        if (datosc.id && datosc.nombre) {
          this.idCliente = datosc.id;
        }
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

  aceptarRegistro() {
    let id = this.id;
    //buscar solicitud
    this.servicio.BuscarRegistro(id).subscribe(
      (datosSolicitud) => {
        let estado = datosSolicitud.estadoId = 2;
        this.servicio.ModificarRegistro(datosSolicitud).subscribe(
          (datos) => {
            alert("Solicitud  aceptada correctamente.");

            let idCliente = this.idCliente;
            //busca cliente
            this.serviciocliente.BuscarRegistro(idCliente).subscribe(
              (datosCliente) => {
                alert("cliente encontrado")
                this.serviciocliente.enviarNoti(datosCliente, estado).subscribe(
                  (datos) => {

                    alert("Cliente notificado")
                    this.router.navigate(["/seguridad/listar-aceptar-solicitudes"]);
                  },
                  (err) => {
                    alert("Error norificando al cliente");
                  }
                );

              },
              (err) => {
                alert("Error encontrado el cliente");
              }
            );





          },
          (err) => {
            alert("Error modificando la solicitud");
          }
        );



        this.router.navigate(["/seguridad/listar-aceptar-solicitudes"]);
      },
      (err) => {
        alert("Error buscando solicitud el registro");
      }
    );
  }

}
