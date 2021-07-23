import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  pagina : number=1;
  regPorPagina:  number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: ProyectoModelo[] = [];
  imagen: String= "" ;
  constructor(private servicio: ProyectoService,
    private servicioimagen:  ImagenesService) { }

  ngOnInit(): void {
    this.ObtenerListadoProyecto();
    this.descargarImagen();
  }

  ObtenerListadoProyecto() {
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


  descargarImagen(){
    

    this.servicioimagen.descargarArchivo(2,"1627004198585-aaaa.png").subscribe(
      (datos) =>{
        this.imagen = datos[0];
        return this.imagen;
      },
      (error) => {
        console.log(error)
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }


}
