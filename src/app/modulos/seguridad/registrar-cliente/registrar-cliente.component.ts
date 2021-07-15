import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router ) {


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
// MOdificar para q sea el formulario de registro
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
          this.servicioSeguridad.AlmacenarDatosSesionEnLocal(datos);          
          this.router.navigate(["/inicio"]);
        },
        (error) => {
          alert("Datos inválidos");
          console.log(error);
        }
      );
    }
  }

}
