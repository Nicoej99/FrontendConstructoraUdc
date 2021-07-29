import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelos';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelos';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

declare var iniciarSelect: any;
@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  ListaBloque: BloqueModelo[]= [];
  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private serviciobloque: BloqueService,
    private router: Router,
    private route: ActivatedRoute ) {


   }

   ConstruirFormulario(){
     this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]], 
      identificador: ['', [Validators.required]], 
      valor: ['', [Validators.required]], 
      bloqueid: ['', [Validators.required]], 
      id: ['', [Validators.required]], 
    
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.getAllBloques();
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let cod = this.ObtenerFgValidador.codigo.value;
    let identificador = this.ObtenerFgValidador.identificador.value;
    let valor = this.ObtenerFgValidador.valor.value;
    let bloqueid = parseInt(this.ObtenerFgValidador.bloqueid.value);
    let id = this.ObtenerFgValidador.id.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.codigo = cod;
    modelo.identificador = identificador;
    modelo.valor = valor;
    modelo.bloqueId = bloqueid;
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
    console.log("Aqui pendejos"+id);
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.identificador);
        this.ObtenerFgValidador.id.setValue(datos.id);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

  getAllBloques() {
    this.serviciobloque.ListarRegistros().subscribe(
      data => {
        this.ListaBloque = data;
        setTimeout(()=>{
          iniciarSelect()
        }, 500);
      },
      error => {
        console.error("Error loading bloque");
      }
    );
  }


}
