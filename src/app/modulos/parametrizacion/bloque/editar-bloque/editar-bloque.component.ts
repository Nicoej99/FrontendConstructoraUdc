import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelos';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaProyecto: ProyectoModelo[]= [];

  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private servicioProyecto : ProyectoService,
    private router: Router,
    private route: ActivatedRoute ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]], 
      proyectoid: ['', [Validators.required]], 
      id: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.getAllProyectos();
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
   
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = this.ObtenerFgValidador.nombre.value;
    modelo.codigo = this.ObtenerFgValidador.codigo.value;
    modelo.descripcion = this.ObtenerFgValidador.descripcion.value;
    modelo.proyectoId =parseInt (this.ObtenerFgValidador.proyectoid.value);
    modelo.id = this.ObtenerFgValidador.id.value;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-bloque"]);
      },
      (err) =>{
        alert("Error modificando el registro");
      }
    );
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
        this.ObtenerFgValidador.proyectoid.setValue(datos.proyectoId);
        this.ObtenerFgValidador.id.setValue(datos.id);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

  getAllProyectos() {
    this.servicioProyecto.ListarRegistros().subscribe(
      data => {
        this.ListaProyecto = data;
        setTimeout(()=>{
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading Proyectos");
      }
    );
  }
}
