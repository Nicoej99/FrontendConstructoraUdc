import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarImagen: any;

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]], 
      imagen: ['', [Validators.required]], 
      descripcion: ['', [Validators.required]], 
      ciudadid: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    iniciarImagen();
    console.log(this.servicio.AlmacenarImagen());
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = this.ObtenerFgValidador.nombre.value;;
    modelo.codigo = this.ObtenerFgValidador.codigo.value;
    modelo.imagen = this.ObtenerFgValidador.imagen.value;
    modelo.descripcion = this.ObtenerFgValidador.descripcion.value;
    modelo.ciudadId = this.ObtenerFgValidador.ciudadid.value;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-proyecto"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }

}
