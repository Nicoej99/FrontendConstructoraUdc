import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelos';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelos';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-informacion-proyecto',
  templateUrl: './informacion-proyecto.component.html',
  styleUrls: ['./informacion-proyecto.component.css']
})
export class InformacionProyectoComponent implements OnInit {

  listaDatos: ProyectoModelo[] = [];

  listaInmuebles: InmuebleModelo[]=[];

  nombreCiudad?: String;
  nombrePais?: String;


  constructor(private servicio: ProyectoService,
    private serviciociudad: CiudadService,
    private serviciopais: PaisService,
    private servicioinmueble: InmuebleService,
    private servicioBloque: BloqueService,
    private serviciosolicitud: SolicitudService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    // como es otro componente le mando el id del proyecto para buscar y tener toda la informacion de ese proyecto
    this.servicio.BuscarRegistro(id).subscribe(
      (datosProyecto) => {
        this.listaDatos.push(datosProyecto);
        // buscar ciudad
        this.serviciociudad.BuscarRegistro(datosProyecto.ciudadId).subscribe(
          (datosCiudad) => {
            this.nombreCiudad = datosCiudad.nombre;
            //buscar pais
            this.serviciopais.BuscarRegistro(datosCiudad.paisId).subscribe(
              (datosPais) => {
                this.nombrePais = datosPais.nombre;

              },
              (err) => {
                alert("No se encuentra el registro con id " + id);
              }
            );
          },
          (err) => {
            alert("No se encuentra el registro con id " + id);
          }
        );
        //buscar inmuebles

        this.servicioBloque.BuscarBloquesProyecto(datosProyecto.id).subscribe(
          (datosBloques) => {

            for (let i = 0; i < datosBloques.length; i++) {
              this.servicioinmueble.BuscarInmuebleBloque(datosBloques[i].id).subscribe(
                (datosInmuebles) => {

                  for (let j = 0; j < datosInmuebles.length; j++) {
                    // retorneme todas las solicitudes de este inmueble y hacemos if si esta no esta aceptada
                    this.serviciosolicitud.BuscarSolicitudImueble(datosInmuebles[j].id).subscribe(
                      (datosSolicitud) => {

                        let bandera: boolean = false;
                        for (let k = 0; k < datosSolicitud.length; k++) {
                          if (datosSolicitud[i].estadoId == 2) {
                            bandera = true;
                            break;
                          }
                          
                        }
                        if (bandera == false) {
                          this.listaInmuebles.push(datosInmuebles[j])
                        }
        
                      },
                      (err) => {
                        alert("No se encuentra el registro con id " + id);
                      }
                    );
                  }
  
                },
                (err) => {
                  alert("No se encuentra el registro con id " + id);
                }
              );
              
            }


          },
          (err) => {
            alert("No se encuentra el registro con id " + id);
          }
        );


      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

}
