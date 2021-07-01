import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as crypto from 'crypto-js';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
    ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      usuario: ['santiago.1701621469@ucaldas.edu.co', [Validators.required, Validators.email]],
      clave: ['sYKp3GalGd', [Validators.required, Validators.min(3)]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ValidarIdentificacion() {
    if (this.fgValidador.invalid) {
      alert("Formulario inválido")
    } else {
      let usuario = this.ObtenerFgvalidador.usuario.value;
      let clave = this.ObtenerFgvalidador.clave.value;
      let claveCifrada = crypto.MD5(clave).toString();
      let modelo = new UsuarioModelo();
      modelo.correo = usuario;
      modelo.clave = claveCifrada;
      this.servicioSeguridad.VerificarUsuario(modelo).subscribe(
        (datos: UsuarioModelo) => {
          alert("Datos correctos");
          console.log(datos);
        },
        (error) => {
          alert("Datos inválidos");
          console.log(error);
        }
      );
    }
  }

}
