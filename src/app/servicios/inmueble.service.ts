import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InmuebleModelo } from '../modelos/inmueble.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<InmuebleModelo[]>{
    return this.http.get<InmuebleModelo[]>(`${this.url}/inmueble`);
  }

  BuscarRegistro(id : number): Observable<InmuebleModelo>{
    return this.http.get<InmuebleModelo>(`${this.url}/inmueble/${id}`);
  }

  AlmacenarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo> {
    console.log(modelo)
    return this.http.post<InmuebleModelo>(
      `${this.url}/inmueble`,
      {
        codigo: modelo.codigo,
        nombre: modelo.identificador
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo> {
    return this.http.put<InmuebleModelo>(
      `${this.url}/inmueble/${modelo.id}`,
      {
        codigo: modelo.codigo,
        nombre: modelo.identificador
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<InmuebleModelo> {
    return this.http.delete<InmuebleModelo>(
      `${this.url}/inmueble/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
