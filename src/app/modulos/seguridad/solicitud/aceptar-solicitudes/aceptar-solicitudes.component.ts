import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-aceptar-solicitudes',
  templateUrl: './aceptar-solicitudes.component.html',
  styleUrls: ['./aceptar-solicitudes.component.css']
})
export class AceptarSolicitudesComponent implements OnInit {

  pagina : number=1;
  regPorPagina:  number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: SolicitudModelo[] = [];
  constructor(private servicio: SolicitudService) { }

  ngOnInit(): void {
    this.ObtenerListadoPais();
  }

  ObtenerListadoPais() {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        
        for(let i=0; i< datos.length ; i++){
          if(datos[i].estadoId == 1 ){
            this.listaRegistros.push(datos[i])
          }
        }

      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

  aceptarRegistro(id :number){

    console.log(id);
  }
  

}
