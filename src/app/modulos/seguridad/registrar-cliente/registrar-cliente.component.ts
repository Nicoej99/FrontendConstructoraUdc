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
import { PaisService } from 'src/app/servicios/pais.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

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
  ListaCiudad: CiudadModelo[] = [];
  nombreImagenTemp: String = "Sin imagen";

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private serviciopais: CiudadService,
    private servicioimagen: ImagenesService,
    private router: Router) {


  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: ['', [Validators.required]],
      cliente: [''],
      nomimagen: ['', [Validators.required]], 
      imagen: ['', []], 
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    iniciarSelect();
    //this.obtenerCiudades();
    this.getAllPaises();

  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ValidarIdentificacion() {

    if (!this.fgValidador.invalid) {
      alert("Formulario inválido, no entro")
    } else {
      let model = this.getClienteData();
      this.servicio.AlmacenarRegistro(model).subscribe(
        (datos) => {
          alert("Registro almacenado correctamente.");
          this.router.navigate(["/inicio"]);
        },
        (err) => {
          alert("Error almacenando el registro");
        }
      );


    }
  }

  getClienteData(): ClienteModelo {
    let model: ClienteModelo = new ClienteModelo();
    model.direccion = this.fgv.address.value;
    model.documento = this.fgv.document.value;
    model.correoElectronico = this.fgv.email.value;
    model.apellido = this.fgv.lastname.value;
    model.nombre = this.fgv.name.value;
    model.numCelular = this.fgv.phone.value;
    model.fechaNacimiento = this.fgv.birthdate.value;
    model.foto = this.fgv.nomimagen.value;
    model.ciudadId = parseInt(this.fgv.city.value);
    alert("Cliente guardado con exito");

    return model;
  }

  get fgv() {
    return this.fgValidador.controls;
  }

  ModCLiente() {
    let direccion = this.fgv.cliente.value;
    this.router.navigate([`/seguridad/editar-cliente/${String(direccion)}`])

  }

  getAllPaises() {
    this.serviciopais.ListarRegistros().subscribe(
      data => {
        this.ListaCiudad = data;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading paises");
      }
    );
  }

  SelectFile(event: any) {
    if (event.target.files.length > 0) {
      let archivo = event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    } else {
      console.log("Se ha cancelado la selecciónd e archivo");
    }
  }

  CargarImagenAlServidor() {
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value);
    this.servicioimagen.CargarCliente(formData).subscribe(
      (datos) => {

        this.nombreImagenTemp = datos.filename;
        this.fgValidador.controls.nomimagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }


}
