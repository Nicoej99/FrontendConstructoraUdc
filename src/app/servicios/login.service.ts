import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { LoginModelo } from '../modelos/login.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<LoginModelo[]>{
    return this.http.get<LoginModelo[]>(`${this.url}/logins`);
  }

  BuscarRegistro(id : number): Observable<LoginModelo>{
    return this.http.get<LoginModelo>(`${this.url}/logins/${id}`);
  }

  AlmacenarRegistro(modelo: LoginModelo): Observable<LoginModelo> {
    console.log("login")
    console.log(modelo)
    return this.http.post<LoginModelo>(
      `${this.url}/logins`,
      {
        correo: modelo.correo ,
        tipoUsuarioId: modelo.tipoUsuarioId ,
        telefono: modelo.telefono 
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: LoginModelo): Observable<LoginModelo> {
    return this.http.put<LoginModelo>(
      `${this.url}/logins/${modelo.id}`,
      {
        correo: modelo.correo ,
        tipoUsuarioId: modelo.tipoUsuarioId ,
        telefono: modelo.telefono 
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<LoginModelo> {
    return this.http.delete<LoginModelo>(
      `${this.url}/logins/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
