import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelos';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

declare var iniciarSelect:any;
@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

   
  fgValidador: FormGroup = new FormGroup({});
  ListaInmuebles: InmuebleModelo[]= [];
  ListaClientes: ClienteModelo[]= [];

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private servicioInmueble: InmuebleService,
    private servicioCliente: ClienteService,
    private router: Router,
    private route: ActivatedRoute ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      fecha: ['', [Validators.required]], 
      inmuebleid: ['', [Validators.required]],
      clienteid: ['', [Validators.required]], 
      oferta: ['', [Validators.required]], 
      estadoid: ['', [Validators.required]], 
      id: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.getAllInmuebles();
    this.getAllClientes();
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let modelo: SolicitudModelo = new SolicitudModelo();
    modelo.fecha_solicitud = this.ObtenerFgValidador.fecha.value;
    modelo.inmuebleId = parseInt (this.ObtenerFgValidador.inmuebleid.value);
    modelo.clienteId = parseInt (this.ObtenerFgValidador.clienteid.value);
    modelo.Oferta_economica = this.ObtenerFgValidador.oferta.value;
    modelo.estadoId = 1;
    modelo.id = this.ObtenerFgValidador.id.value;;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-pais"]);
      },
      (err) =>{
        alert("Error modificando el registro");
      }
    );
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.fecha.setValue(datos.fecha_solicitud);
        this.ObtenerFgValidador.inmuebleid.setValue(datos.inmuebleId);
        this.ObtenerFgValidador.clienteid.setValue(datos.clienteId);
        this.ObtenerFgValidador.oferta.setValue(datos.Oferta_economica);
        this.ObtenerFgValidador.estadoid.setValue(datos.estadoId);
        this.ObtenerFgValidador.id.setValue(datos.id);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
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
