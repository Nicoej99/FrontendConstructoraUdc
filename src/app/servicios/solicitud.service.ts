import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SolicitudModelo } from '../modelos/solicitud.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<SolicitudModelo[]>{
    return this.http.get<SolicitudModelo[]>(`${this.url}/solicitud`);
  }

  BuscarSolicitudImueble(id : number): Observable<SolicitudModelo[]>{
    
    return this.http.get<SolicitudModelo[]>(`${this.url}/inmuebles/${id}/solicituds`);
    
  }

  BuscarRegistro(id : number): Observable<SolicitudModelo>{
    return this.http.get<SolicitudModelo>(`${this.url}/solicitud/${id}`);
  }

  AlmacenarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.post<SolicitudModelo>(
      `${this.url}/solicitud`,
      {
        fecha_solicitud: modelo.fecha_solicitud,
        Oferta_economica: modelo.Oferta_economica,
        inmuebleId: modelo.inmuebleId,
        estadoId: modelo.estadoId,
        clienteId: modelo.clienteId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.put<SolicitudModelo>(
      `${this.url}/solicitud/${modelo.id}`,
      {
        fecha_solicitud: modelo.fecha_solicitud,
        Oferta_economica: modelo.Oferta_economica,
        inmuebleId: modelo.inmuebleId,
        estadoId: modelo.estadoId,
        clienteId: modelo.clienteId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<SolicitudModelo> {
    return this.http.delete<SolicitudModelo>(
      `${this.url}/solicitud/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
