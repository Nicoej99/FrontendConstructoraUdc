import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare var iniciarDesplegable: any;

@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrls: ['./barra-navegacion-superior.component.css']
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isLoggedIn: boolean = false;
  isVendedor: boolean = false;
  isAdmin: boolean = false;

  constructor(private servicioSeguridad: SeguridadService) { }

  suscripcion: Subscription = new Subscription();

  ngOnInit(): void {
    this.abrirdesplegar();
    this.suscripcion = this.servicioSeguridad.ObtenerDatosSesion().subscribe(
      (datos) => {
        console.log(datos)
        this.isLoggedIn = datos.isLoggedIn;
        this.isVendedor = datos.isVendedor;
        this.isAdmin = datos.isAdmin;

      },
      (error) => {

      }
    );
  }

  abrirdesplegar() {
    setTimeout(() => {
      iniciarDesplegable()
    }, 500);
  }



}
