import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelos';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

declare var iniciarSelect:any;
@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaRegistros: SolicitudModelo[] = [];
  ListaInmuebles: InmuebleModelo[]= [];
  ListaClientes: ClienteModelo[]= [];


  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private servicioInmueble: InmuebleService,
    private servicioCliente: ClienteService,
    private router: Router) {


  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      fecha: ['', [Validators.required]],
      inmuebleid: ['', [Validators.required]],
      clienteid: ['', [Validators.required]],
      oferta: ['', [Validators.required]],
      estadoid: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.getAllInmuebles();
    this.getAllClientes();
  }
  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {

    let modelo: SolicitudModelo = new SolicitudModelo();
    modelo.fecha_solicitud = this.ObtenerFgValidador.fecha.value;
    modelo.inmuebleId = parseInt(this.ObtenerFgValidador.inmuebleid.value); // enviarlo al backend
    modelo.clienteId = parseInt(this.ObtenerFgValidador.clienteid.value);
    modelo.Oferta_economica = this.ObtenerFgValidador.oferta.value;
    modelo.estadoId = 1;



    this.servicio.BuscarSolicitudImueble(this.ObtenerFgValidador.inmuebleid.value).subscribe(
      (datos) => {
        this.listaRegistros = datos;
        if (this.listaRegistros[0] == undefined) {

          this.servicio.AlmacenarRegistro(modelo).subscribe(
            (datos) => {
              alert("Registro almacenado correctamente.");
              this.router.navigate(["/seguridad/listar-solicitud"]);
            },
            (err) => {
              alert("Error almacenando el registro");
            }
          );

        } else {
          // mirar en un for si las solicitudes estan en estudio
          let bandera: boolean = false;
          for (let i = 0; i < this.listaRegistros.length; i++) {
            if (this.listaRegistros[i].estadoId == 1) {
              alert("no se admiten mas solicitudes por el momento")
              bandera = true;
              break;
            }
          }
          if (bandera == false) {
            this.servicio.AlmacenarRegistro(modelo).subscribe(
              (datos) => {
                alert("Registro almacenado correctamente.");
                this.router.navigate(["/seguridad/listar-solicitud"]);
              },
              (err) => {
                alert("Error almacenando el registro");
              }
            );
          }
        }
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    );
  }

  getAllInmuebles() {
    this.servicioInmueble.ListarRegistros().subscribe(
      data => {
        this.ListaInmuebles = data;
        setTimeout(() =>{
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading paises");
      }
    );
  }

  getAllClientes() {
    this.servicioCliente.ListarRegistros().subscribe(
      data => {
        this.ListaClientes = data;
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
