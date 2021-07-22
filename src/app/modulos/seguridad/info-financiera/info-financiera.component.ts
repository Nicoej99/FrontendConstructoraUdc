import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { InfoFinancieraModelo } from 'src/app/modelos/info-financiera';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelos';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare var iniciarSelect: any;
@Component({
  selector: 'app-info-financiera',
  templateUrl: './info-financiera.component.html',
  styleUrls: ['./info-financiera.component.css']
})
export class InfoFinancieraComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaCliente: ClienteModelo[]= [];

  constructor(private fb: FormBuilder,
    private servicio: InfoFinancieraService,
    private servicioCliente: ClienteService,
    private router: Router) {


  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      TIngresos: ['', [Validators.required]],
      datos_trabajo: ['', [Validators.required]],
      tiempo_trabajo_actual: ['', [Validators.required]],
      nombre_ref_fam: ['', [Validators.required]],
      tel_ref_fam: ['', [Validators.required]],
      nombre_ref_personal: ['', [Validators.required]],
      tel_ref_personal: ['', [Validators.required]],
      clienteId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    iniciarSelect();
    this.ConstruirFormulario();
    this.getAllClientes();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ValidarIdentificacion() {
    console.log(this.fgValidador)
    alert(this.fgValidador.invalid + "es aqui")
    if (this.fgValidador.invalid) {
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

  getClienteData(): InfoFinancieraModelo {
    let model: InfoFinancieraModelo = new InfoFinancieraModelo();
    model.total_ingresos = this.fgv.TIngresos.value;
    model.datos_trabajo = this.fgv.datos_trabajo.value;
    model.tiempo_trabajo_actual = this.fgv.tiempo_trabajo_actual.value;
    model.nombre_ref_fam = this.fgv.nombre_ref_fam.value;
    model.tel_ref_fam = this.fgv.tel_ref_fam.value;
    model.nombre_ref_personal = this.fgv.nombre_ref_personal.value;
    model.tel_ref_personal = this.fgv.tel_ref_personal.value;
    model.clienteId = parseInt(this.fgv.clienteId.value);
    alert("Info Financiera guardado con exito");

    return model;
  }

  get fgv() {
    return this.fgValidador.controls;
  }

  getAllClientes() {
    this.servicioCliente.ListarRegistros().subscribe(
      data => {
        this.ListaCliente = data;
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
