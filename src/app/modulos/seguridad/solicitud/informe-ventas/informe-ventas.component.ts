import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

declare var torta: any;

@Component({
  selector: 'app-informe-ventas',
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.css']
})
export class InformeVentasComponent implements OnInit {

  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistrosPorPagina;
  listaSolicitudes: SolicitudModelo[] = [];
  listaGrafico: any[] = [];

  constructor(private servicio: SolicitudService) { }

  ngOnInit(): void {
    
    this.ObtenerListadoSolicitudes();
  }


  ObtenerListadoSolicitudes() {
   
    
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaSolicitudes = datos;
        this.listaSolicitudes
        torta(this.listaSolicitudes); //enviar despues de obtener el diccionario


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
