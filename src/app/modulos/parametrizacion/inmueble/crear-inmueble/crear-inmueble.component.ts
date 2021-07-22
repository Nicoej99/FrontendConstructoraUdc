import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelos';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelos';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarSelect:any;
@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaBloques: BloqueModelo[]= [];
  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private serviciopais: BloqueService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      identificador: ['', [Validators.required]], 
      valor: ['', [Validators.required]], 
      bloqueid: ['', [Validators.required]], 
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.getAllPaises()
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let cod = this.ObtenerFgValidador.codigo.value;
    let identificador = this.ObtenerFgValidador.identificador.value;
    let valor = this.ObtenerFgValidador.valor.value;
    let bloqueid = this.ObtenerFgValidador.bloqueid.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.codigo = cod;
    modelo.identificador = identificador;
    modelo.valor = valor;
    modelo.bloqueId = parseInt( bloqueid);

    
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-inmueble"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }


  getAllPaises() {
    this.serviciopais.ListarRegistros().subscribe(
      data => {
        this.ListaBloques = data;
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
