import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { FormsConfig } from '../../../config/forms-config';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { ClienteModule } from '../../cliente/cliente.module';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaisModelo } from 'src/app/modelos/pais.modelos';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { element } from 'protractor';
import { getHtmlTagDefinition } from '@angular/compiler';

declare var iniciarSelect: any;
declare var agregarCiudades: any;

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  documentMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;
  nameMinLength = FormsConfig.NAME_MIN_LENGTH;
  listaRegistros: CiudadModelo[] = [];
  
  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router ) {


   }

   ConstruirFormulario(){
    this.fgValidador = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: ['',[Validators.required]],
      cliente: ['']
    });
   }

   ngOnInit(): void {
    this.ConstruirFormulario();
    iniciarSelect();
    //this.obtenerCiudades();
    
    
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ValidarIdentificacion() {

    alert(this.fgValidador.invalid+"es aqui")
    if (this.fgValidador.invalid) {
      alert("Formulario inválido, no entro")
    } else {
      let model = this.getClienteData();
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

  getClienteData(): ClienteModelo {
    let model: ClienteModelo = new ClienteModelo();
    model.direccion = this.fgv.address.value;
    model.ciudadId = this.fgv.city.value;
    model.documento = this.fgv.document.value;
    model.correoElectronico = this.fgv.email.value;
    model.apellido = this.fgv.lastname.value;
    model.nombre = this.fgv.name.value;
    model.numCelular = this.fgv.phone.value;
    model.fechaNacimiento = this.fgv.birthdate.value;
    model.foto = "SOY UNA FOTO";
    alert("Cliente guardado con exito");
    
    return model;
  }

  get fgv() {
    return this.fgValidador.controls;
  }

  obtenerCiudades(){
    this.servicio.ListarCiudad().subscribe(
      (datos) => {
        this.listaRegistros = datos;
        agregarCiudades(this.listaRegistros);
        
      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    );
  }

  ModCLiente(){
    let direccion = this.fgv.cliente.value;
    this.router.navigate([`/seguridad/editar-cliente/${String(direccion)}`])
    
  }

}
