import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { FormsConfig } from 'src/app/config/forms-config';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

declare var iniciarSelect: any;
declare var ObtenerRol: any;

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  documentMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;
  nameMinLength = FormsConfig.NAME_MIN_LENGTH;
  
  
  constructor(private fb: FormBuilder,
    private servicio: UsuarioService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      });
   }

   ngOnInit(): void {
    this.ConstruirFormulario();
    iniciarSelect();
    ObtenerRol()
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  
  ValidarIdentificacion() {
    alert(this.fgValidador.invalid+"es aqui")
    console.log(this.fgValidador);
    ObtenerRol()
    
    if (this.fgValidador.invalid) {
      alert("Formulario inválido, no entro")
    } else {
      alert("entro")
      let model = this.getUsuarioData();
      console.log(model);
      this.servicio.AlmacenarRegistro(model).subscribe(
        (datos) =>{
          alert("Registro almacenado correctamente.");
          this.router.navigate(["/inicio"]);
        },
        (err) =>{
          alert("Error almacenando el registro");
        }
      );
      
      
    }
  }

  
  getUsuarioData(): UsuarioModelo {
    let model: UsuarioModelo = new UsuarioModelo();
    model.correo = this.fgv.email.value;
   // model.tipoUsuarioId = this.fgv.tipoUsuarioId.value;
    model.telefono = this.fgv.phone.value;
    model.documento = this.fgv.document.value;
    model.nombre = this.fgv.name.value;
    model.apellido = this.fgv.lastname.value;
    model.ciudadId = this.fgv.city.value;
    model.role = ObtenerRol();
    alert(model.ciudadId+ " id ciudad")
   
    alert("Usuario guardado con exito, pasamos al back");
    
    return model;
  }

  get fgv() {
    return this.fgValidador.controls;
  }

}