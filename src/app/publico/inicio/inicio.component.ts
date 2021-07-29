import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { ResetPasswordModelo } from 'src/app/modelos/resetpassword.modelos';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { InicioService } from 'src/app/servicios/inicio.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var inyectarCodigo: any;
declare var iniciarDesplegable: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  pagina : number=1;
  regPorPagina:  number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: ClienteModelo = {};
  listarProyectos: ProyectoModelo[] = []
  constructor(private servicio: InicioService,
    private servicioProyecto: ProyectoService,) { }

  ngOnInit(): void {
    this.ObtenerCorreoCliente();
    this.ObtenerListadoProyecto();
    iniciarDesplegable();

    
  }

  ObtenerCorreoCliente() {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let rol = JSON.parse(datos);
      this.servicio.obtenerCorreo(rol.username).subscribe(
        (datos) => {
          inyectarCodigo(datos.nombre,datos.apellido);
        },
        (err) => {
          alert("Error cargando el listado de registros");
        }
      );
    }
  }


  ObtenerListadoProyecto() {
    this.servicioProyecto.ListarRegistros().subscribe(
      (datos) => {
        this.listarProyectos = datos;
      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

  dirigir(id:number){
    
  }

}
