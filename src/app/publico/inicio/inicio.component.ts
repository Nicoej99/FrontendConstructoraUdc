import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { ResetPasswordModelo } from 'src/app/modelos/resetpassword.modelos';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { InicioService } from 'src/app/servicios/inicio.service';

declare var inyectarCodigo: any;
declare var iniciarDesplegable: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


 
  listaRegistros: ClienteModelo = {};
  constructor(private servicio: InicioService) { }

  ngOnInit(): void {
    this.ObtenerCorreoCliente();
    iniciarDesplegable();
    
  }

  

  ObtenerCorreoCliente() {

    
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let rol = JSON.parse(datos);
      this.servicio.obtenerCorreo(rol.username).subscribe(
        (datos) => {
          console.log("+++++++------")
          console.log(datos)
          console.log("+++++++------")
          inyectarCodigo(datos.nombre,datos.apellido);
        },
        (err) => {
          alert("Error cargando el listado de registros");
        }
      );
    }
  }

}
