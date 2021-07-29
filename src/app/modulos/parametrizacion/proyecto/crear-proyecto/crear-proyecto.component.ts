import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { url } from 'node:inspector';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarImagen: any;
declare var iniciarSelect: any;
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaCiudad: CiudadModelo[]= [];
  nombreImagenTemp: String = "Sin imagen";


  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private serviciociudad: CiudadService,
    private servicioimagen: ImagenesService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]], 
      descripcion: ['', [Validators.required]], 
      ciudadid: ['', [Validators.required]], 
      imagen: ['', []], 
      nomimagen: ['', [Validators.required]], 
      imagenPrevisualizacion: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.getAllCiudades();
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = this.ObtenerFgValidador.nombre.value;
    modelo.codigo = this.ObtenerFgValidador.codigo.value;
    modelo.imagen =  this.ObtenerFgValidador.nomimagen.value;
    modelo.descripcion = this.ObtenerFgValidador.descripcion.value;
    modelo.ciudadId = parseInt( this.ObtenerFgValidador.ciudadid.value);
    
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

  getAllCiudades() {
    this.serviciociudad.ListarRegistros().subscribe(
      data => {
        this.ListaCiudad = data;
        setTimeout(()=>{
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading ciudad");
      }
    );
  }

  SelectFile(event:any){
    if(event.target.files.length > 0){
      let archivo = event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    }else{
      console.log("Se ha cancelado la selecciónd e archivo");
    }
  }

  CargarImagenAlServidor(){
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value);
    this.servicioimagen.CargarArchivo(formData).subscribe(
      (datos) =>{
        
        this.nombreImagenTemp = datos.filename;
        this.fgValidador.controls.nomimagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }


}
