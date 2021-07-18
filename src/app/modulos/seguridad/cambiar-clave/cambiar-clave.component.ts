import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CambiarContraseñaModelo } from 'src/app/modelos/cambiarcontraseña.modelos';
import { CambiarclaveService } from 'src/app/servicios/cambiarclave.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: CambiarclaveService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  cambiarClave() {
    let modelo: CambiarContraseñaModelo = new CambiarContraseñaModelo();
    modelo.oldPassword = this.ObtenerFgvalidador.oldPassword.value;
    modelo.newPassword = this.ObtenerFgvalidador.newPassword.value;
    this.servicio.CambiarClave(modelo).subscribe(
      (datos) =>{
        alert("Contraseña cambiada correctamente.");
        this.router.navigate(["/inicio"]);
      },
      (err) =>{
        alert("Contraseña actual no es valida");
      }
    );
  }

}
