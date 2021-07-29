import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';


declare var iniciarSelect: any;
@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaCiudad: CiudadModelo[]= [];
  nombreImagenTemp?: String = "Sin imagen";

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private serviciociudad : CiudadService,
    private router: Router,
    private servicioimagen: ImagenesService,
    private route: ActivatedRoute ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]], 
      imagen: ['', []], 
      nomimagen: ['',[]], 
      descripcion: ['', [Validators.required]], 
      ciudadid: ['', [Validators.required]], 
      id: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.getAllCiudades();
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {

    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = this.ObtenerFgValidador.nombre.value;;
    modelo.codigo = this.ObtenerFgValidador.codigo.value;
    modelo.imagen = this.ObtenerFgValidador.nomimagen.value;
    modelo.descripcion = this.ObtenerFgValidador.descripcion.value;
    modelo.ciudadId = parseInt( this.ObtenerFgValidador.ciudadid.value);
    modelo.id =this.ObtenerFgValidador.id.value;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-proyecto"]);
      },
      (err) =>{
        alert("Error modificando el registro");
      }
    );
  }

  ObtenerRegistroPorId(id: number) {
    console.log("Aqui pendejos"+id);
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
        this.ObtenerFgValidador.ciudadid.setValue(datos.ciudadId);
        this.ObtenerFgValidador.id.setValue(datos.id);
        this.nombreImagenTemp = datos.imagen;
        this.ObtenerFgValidador.nomimagen.setValue(datos.imagen);

      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
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
