import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelos';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaRegistros: SolicitudModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private router: Router ) {


   }

   ConstruirFormulario(){
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
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    
    let modelo: SolicitudModelo = new SolicitudModelo();
    modelo.fecha_solicitud = this.ObtenerFgValidador.fecha.value;
    modelo.inmuebleId = this.ObtenerFgValidador.inmuebleid.value; // enviarlo al backend
    modelo.clienteId = this.ObtenerFgValidador.clienteid.value;
    modelo.Oferta_economica = this.ObtenerFgValidador.oferta.value;
    modelo.estadoId = 1;
    console.log("***************************")

    

    this.servicio.BuscarSolicitudImueble(this.ObtenerFgValidador.inmuebleid.value).subscribe(
      (datos) =>{
        this.listaRegistros = datos;
        if (this.listaRegistros[0] == undefined){

          this.servicio.AlmacenarRegistro(modelo).subscribe(
            (datos) =>{
              alert("Registro almacenado correctamente.");
              this.router.navigate(["/seguridad/listar-solicitud"]);
            },
            (err) =>{
              alert("Error almacenando el registro");
            }
          );
          
        }else{
          alert("inmueble tiene solicitudes");
          if (this.listaRegistros[0].clienteId == this.ObtenerFgValidador.clienteid.value){

            this.servicio.AlmacenarRegistro(modelo).subscribe(
              (datos) =>{
                alert("Registro almacenado correctamente para la misma persona.");
                this.router.navigate(["/seguridad/listar-solicitud"]);
              },
              (err) =>{
                alert("Error almacenando el registro");
              }
            );

          }else{
            alert("este inmueble ya esta solicitado por otra persona")
            // si no es la misma persona hacer un for recorriendo todas las solicitudes y ver si alguna esta en estudio
          } 
        }
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }


}
