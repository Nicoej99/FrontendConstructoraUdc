import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

   
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
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
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let modelo: SolicitudModelo = new SolicitudModelo();
    modelo.fecha_solicitud = this.ObtenerFgValidador.fecha.value;;
    modelo.inmuebleId = this.ObtenerFgValidador.inmuebleid.value;
    modelo.clienteId = this.ObtenerFgValidador.clienteid.value;
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


}
