import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  entity = '/usuario';
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuario`);
  }

  BuscarRegistro(id : number): Observable<UsuarioModelo>{
    return this.http.get<UsuarioModelo>(`${this.url}/usuario/${id}`);
  }

  AlmacenarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo> {
    console.log("estamos en almacenar registro"+modelo)
    console.log(modelo.nombre)
    console.log(modelo.apellido)
    console.log(modelo.documento)
    console.log(modelo.ciudadId)
    console.log(modelo.correo)
    console.log(modelo.telefono)
    console.log(modelo.role)
    console.log(modelo.ciudadId)


    return this.http.post<UsuarioModelo>(
      `${this.url}/user`,     
      {

        nombre: modelo.nombre,
        apellido: modelo.apellido,
        documento: modelo.documento,
        correoElectronico: modelo.correo,
        numCelular: modelo.telefono,
        rol: modelo.role,
        ciudadId: modelo.ciudadId

      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.put<UsuarioModelo>(
      `${this.url}/user/${modelo.id}`,
      {
        nombre: modelo.nombre,
        apellido: modelo.apellido,
        documento: modelo.documento,
        correoElectronico: modelo.correo,
        numCelular: modelo.telefono,
        rol: modelo.role,
        ciudadId: modelo.ciudadId

      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<UsuarioModelo> {
    return this.http.delete<UsuarioModelo>(
      `${this.url}/user/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  CustomerRegistering(cliente: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(`${this.http}${this.entity}`, cliente, {
      headers: new HttpHeaders({})
    });
  }
}