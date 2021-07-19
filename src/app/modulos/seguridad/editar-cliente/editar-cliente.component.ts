import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelos';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelos';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  documentMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;
  nameMinLength = FormsConfig.NAME_MIN_LENGTH;
  listaRegistros: CiudadModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute ) {


   }

   ConstruirFormulario(){
    this.fgValidador = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: ['',[Validators.required]],
      id: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    console.log("AQUI DORMIDOS"+id)
    this.ObtenerRegistroPorId(id);
  }
  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let document = this.ObtenerFgValidador.document.value;
    let name = this.ObtenerFgValidador.name.value;
    let lastname = this.ObtenerFgValidador.lastname.value;
    let phone = this.ObtenerFgValidador.phone.value;
    let email = this.ObtenerFgValidador.email.value;
    let address = this.ObtenerFgValidador.address.value;
    let city = this.ObtenerFgValidador.city.value;
    let birthdate = this.ObtenerFgValidador.birthdate.value;
    let modelo: ClienteModelo = new ClienteModelo();
    modelo.documento = document;
    modelo.nombre = name;
    modelo.apellido = lastname;
    modelo.fechaNacimiento = birthdate;
    modelo.numCelular = phone;
    modelo.correoElectronico = email;
    modelo.direccion = address;
    modelo.ciudadId = city;
    modelo.foto = "SOY OTRA FOTO";
    modelo.id = this.ObtenerFgValidador.id.value;
   
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro modificado correctamente.");
        this.router.navigate(["/inicio"]);
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
        this.ObtenerFgValidador.document.setValue(datos.documento);
        this.ObtenerFgValidador.name.setValue(datos.nombre);
        this.ObtenerFgValidador.lastname.setValue(datos.apellido);
        this.ObtenerFgValidador.phone.setValue(datos.numCelular);
        this.ObtenerFgValidador.email.setValue(datos.correoElectronico);
        this.ObtenerFgValidador.address.setValue(datos.direccion);
        this.ObtenerFgValidador.city.setValue(datos.ciudadId);
        this.ObtenerFgValidador.birthdate.setValue(datos.fechaNacimiento);
        this.ObtenerFgValidador.id.setValue(datos.id);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      }
    );
  }

}

