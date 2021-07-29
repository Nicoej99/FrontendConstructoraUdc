import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

declare var informetorta: any;
@Component({
  selector: 'app-informe-ciudad',
  templateUrl: './informe-ciudad.component.html',
  styleUrls: ['./informe-ciudad.component.css']
})
export class InformeCiudadComponent implements OnInit {

  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistrosPorPagina;
  
  listaGrafica: any[] = []

  constructor(private servicio: CiudadService,
    private servicioProyecto: ProyectoService,
    private servicioBloque: BloqueService,
    private servicioInmueble: InmuebleService,
    private servicioSolicitud: SolicitudService,
  ) { }

  ngOnInit(): void {

    this.ObtenerListadoSolicitudes();
  }


  ObtenerListadoSolicitudes() {

    
    this.servicio.ListarRegistros().subscribe(
      (datosCiudades) => {
        
        for (let i = 0; i < datosCiudades.length; i++) {
          let lista : any = [1,2, datosCiudades[i].nombre,i] 
          this.servicioProyecto.BuscarProyectoCiudad(datosCiudades[i].id).subscribe(
            (datosProyecto) => {
              
              for (let j = 0; j < datosProyecto.length; j++) {
                this.servicioBloque.BuscarBloquesProyecto(datosProyecto[j].id).subscribe(
                  (datosBloques) => {
                    
                    for (let k = 0; k < datosBloques.length; k++) {
                      this.servicioInmueble.BuscarInmuebleBloque(datosBloques[k].id).subscribe(
                        (datosInmueble) => {
                        
                          for (let l = 0; l < datosInmueble.length; l++) {
                            this.servicioSolicitud.BuscarSolicitudImueble(datosInmueble[l].id).subscribe(
                              (datosSolicitud) => {
                                
                                
                                let bandera : boolean = false;
                                for (let m = 0; m < datosSolicitud.length; m++) {
                                  if (datosSolicitud[m].estadoId == 2) {
                                    bandera = true;
                                    break;
                                  }
                                }

                                if (bandera == true) {
                                  
                                  lista[0] = lista[0] +1;

                                }else if (bandera == false) {
                                  lista[1] = lista[1] +1;
                                }
                                
                               
                                
                                
      
                              },
                              (err) => {
                                alert("No se encuentra el registro con id " );
                              }
                            );
                            
                              
                          }
                          

                        },
                        (err) => {
                          alert("No se encuentra el registro con id " );
                        }
                      );

                    }
                   
                    if (j == datosProyecto.length-1 ) {
                      console.log(lista[0] )
                      informetorta(lista)
                    }

                  },
                  (err) => {
                    alert("No se encuentra el registro con id " );
                  }
                );
                  
                

              }

            },
            (err) => {
              alert("No se encuentra el registro con id ");
            }
          );

        }


      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    );
      
  }

  CambioPagina(p: number) {
    this.pagina = p;
  }



}
