import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  entity = '/cliente';
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<ClienteModelo[]>{
    return this.http.get<ClienteModelo[]>(`${this.url}/cliente`);
  }

  ListarCiudad(): Observable<ClienteModelo[]>{//ciudades 
    return this.http.get<ClienteModelo[]>(`${this.url}/ciudad`);
  }


  BuscarRegistro(id : number): Observable<ClienteModelo>{
    return this.http.get<ClienteModelo>(`${this.url}/cliente/${id}`);
  }

  AlmacenarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.post<ClienteModelo>(
      `${this.url}/cliente`,     
      {
       
        documento: modelo.documento,
        nombre: modelo.nombre,
        apellido: modelo.apellido,
        fechaNacimiento: modelo.fechaNacimiento,
        foto: modelo.foto,
        numCelular: modelo.numCelular,
        correoElectronico: modelo.correoElectronico,
        direccion: modelo.direccion,
        ciudadId: modelo.ciudadId
        
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.put<ClienteModelo>(
      `${this.url}/cliente/${modelo.id}`,
      {
        documento: modelo.documento,
        nombre: modelo.nombre,
        apellido: modelo.apellido,
        fechaNacimiento: modelo.fechaNacimiento,
        foto: modelo.foto,
        numCelular: modelo.numCelular,
        correoElectronico: modelo.correoElectronico,
        direccion: modelo.direccion,
        ciudadId: modelo.ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<ClienteModelo> {
    return this.http.delete<ClienteModelo>(
      `${this.url}/cliente/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }



  CustomerRegistering(cliente: ClienteModelo): Observable<ClienteModelo> {
    return this.http.post<ClienteModelo>(`${this.http}${this.entity}`, cliente, {
      headers: new HttpHeaders({})
    });
  }
}
