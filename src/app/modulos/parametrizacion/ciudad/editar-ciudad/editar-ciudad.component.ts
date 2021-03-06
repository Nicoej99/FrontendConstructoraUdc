import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelos';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';

declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaPais: PaisModelo[]= [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private servicioPais: PaisService,
    private router: Router,
    private route: ActivatedRoute ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]], 
      paisid: ['', [Validators.required]], 
      id: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.getAllPaises()
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let cod = this.ObtenerFgValidador.codigo.value;
    let nom = this.ObtenerFgValidador.nombre.value;
    let paisid = parseInt( this.ObtenerFgValidador.paisid.value);
    let id = this.ObtenerFgValidador.id.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.paisId = paisid;
    modelo.id = id;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-ciudad"]);
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
        this.ObtenerFgValidador.paisid.setValue(datos.paisId);
        this.ObtenerFgValidador.id.setValue(datos.id);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

  getAllPaises() {
    this.servicioPais.ListarRegistros().subscribe(
      (data) => {
        this.ListaPais = data;
        setTimeout(()=>{
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading paises");
      }
    );
  }


}
