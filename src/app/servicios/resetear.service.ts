import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ResetPasswordModelo } from '../modelos/resetpassword.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ResetearService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  

  ResetearPassword(modelo: ResetPasswordModelo): Observable<ResetPasswordModelo> {
    console.log(modelo)
    return this.http.post<ResetPasswordModelo>(
      `${this.url}/reset-password`,
      {
        correo: modelo.email
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  
}
