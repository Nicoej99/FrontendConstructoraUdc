import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { FormsConfig } from 'src/app/config/forms-config';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { LoginModelo } from 'src/app/modelos/login.modelos';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { LoginService } from 'src/app/servicios/login.service';
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
  ListaCiudad: CiudadModelo[]= [];


  constructor(private fb: FormBuilder,
    private servicio: UsuarioService,
    private serviciologin: LoginService,
    private servicioCiudades: CiudadService,
    private router: Router) {


  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      rol: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    iniciarSelect();
    this.getAllCiudades();
  }

  get fgv() {
    return this.fgValidador.controls;
  }


  ValidarIdentificacion() {
    // modelo usuario
    let model: UsuarioModelo = new UsuarioModelo();
    model.documento = this.fgv.document.value;
    model.nombre = this.fgv.name.value;
    model.apellido = this.fgv.lastname.value;
    model.telefono = this.fgv.phone.value;
    model.correo = this.fgv.email.value;
    model.ciudadId = this.fgv.city.value;
    model.role = this.fgv.rol.value

    //modelo login
    let modelLogin: LoginModelo = new LoginModelo();
    modelLogin.correo = this.fgv.email.value;
    modelLogin.tipoUsuarioId = this.fgv.rol.value;
    modelLogin.telefono = this.fgv.phone.value;
    console.log("++++++++")
    console.log(modelLogin)
    console.log("++++++++")

    if (this.fgValidador.invalid) {
      alert("Formulario inválido")
    } else {
      // almacena registro usuario
      this.servicio.AlmacenarRegistro(model).subscribe(
        (datos) => {
          console.log("Registro almacenado en la base de datos correctamente.");

          //crea usuario y contraseña usuario al login
          this.serviciologin.AlmacenarRegistro(modelLogin).subscribe(
            (datos) => {
              console.log("usuario y contraseña enviado al correo.");

            },
            (err) => {
              console.log("Error al generar usuario y contraseña");
            }
          );
          //----------
        },
        (err) => {
          console.log("Error al almacenando el registro en la base de datos");
        }
      );


    }
  }

  getAllCiudades() {
    this.servicioCiudades.ListarRegistros().subscribe(
      data => {
        this.ListaCiudad = data;
        setTimeout(() =>{
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading paises");
      }
    );
  }





}