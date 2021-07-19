import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelos';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaPais: PaisModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private serviciopais:PaisService,
    private router: Router ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      nombre: ['', [Validators.required]], 
      paisid: ['', [Validators.required]], 
    
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
    let nom = this.ObtenerFgValidador.nombre.value;
    let cod = this.ObtenerFgValidador.codigo.value;
    let paisid = this.ObtenerFgValidador.paisid.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.paisId = parseInt(paisid);
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-ciudad"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }

  getAllPaises() {
    this.serviciopais.ListarRegistros().subscribe(
      data => {
        this.ListaPais = data;
        //setTimeout(initSelect(), 500);
      },
      error => {
        console.error("Error loading paises");
      }
    );
  }

}
