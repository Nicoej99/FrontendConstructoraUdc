import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordModelo } from 'src/app/modelos/resetpassword.modelos';
import { ResetearService } from 'src/app/servicios/resetear.service';

@Component({
  selector: 'app-resetear-clave',
  templateUrl: './resetear-clave.component.html',
  styleUrls: ['./resetear-clave.component.css']
})
export class ResetearClaveComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ResetearService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ResetPassword(){
    let modelo: ResetPasswordModelo = new ResetPasswordModelo();
    modelo.email = this.ObtenerFgvalidador.email.value;
    this.servicio.ResetearPassword(modelo).subscribe(
      (datos) =>{
        alert("Constraseña cambiada correctamente.");
        this.router.navigate(["/inicio"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }

 

}
