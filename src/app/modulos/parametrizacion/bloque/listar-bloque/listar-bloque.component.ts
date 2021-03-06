import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { BloqueModelo } from 'src/app/modelos/bloque.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css']
})
export class ListarBloqueComponent implements OnInit {

  pagina : number=1;
  regPorPagina:  number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: BloqueModelo[] = [];
  constructor(private servicio: BloqueService) { }

  ngOnInit(): void {
    this.ObtenerListadoBloque();
  }

  ObtenerListadoBloque() {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
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
