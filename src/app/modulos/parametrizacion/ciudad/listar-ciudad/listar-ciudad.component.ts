import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {

  pagina : number=1;
  regPorPagina:  number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: CiudadModelo[] = [];
  listaInfoCiudad:any[]=[];
  datoInmueble:any[]= [];
  constructor(private servicio: CiudadService) { }

  ngOnInit(): void {
    this.ObtenerListadoCiudad();
  }

  ObtenerListadoCiudad() {
    this.servicio.ListarRegistros().subscribe(
      (datosCiudades) => {
        this.listaRegistros = datosCiudades;
      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
