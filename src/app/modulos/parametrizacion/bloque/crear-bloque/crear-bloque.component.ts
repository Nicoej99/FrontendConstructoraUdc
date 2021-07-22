import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelos';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarSelect: any;
@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaProyectos: ProyectoModelo[]= [];
  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private serviciopais: ProyectoService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]], 
      descripcion: ['', [Validators.required]], 
      proyectoid: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.getAllPaises();
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro() {

    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = this.ObtenerFgValidador.nombre.value;
    modelo.codigo = this.ObtenerFgValidador.codigo.value;
    modelo.descripcion = this.ObtenerFgValidador.descripcion.value;
    modelo.proyectoId = parseInt( this.ObtenerFgValidador.proyectoid.value);
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-bloque"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }

  getAllPaises() {
    this.serviciopais.ListarRegistros().subscribe(
      data => {
        this.ListaProyectos = data;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading paises");
      }
    );
  }

}
