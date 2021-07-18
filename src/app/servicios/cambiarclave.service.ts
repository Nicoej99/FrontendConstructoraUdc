import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { CambiarContraseñaModelo } from '../modelos/cambiarcontraseña.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CambiarclaveService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

 
  CambiarClave(modelo: CambiarContraseñaModelo): Observable<CambiarContraseñaModelo> {
    console.log(modelo)
    return this.http.post<CambiarContraseñaModelo>(
      `${this.url}/change-password`,
      {
        oldPassword: modelo.oldPassword,
        newPassword: modelo.newPassword
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  
}
