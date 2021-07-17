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

  BuscarRegistro(id : number): Observable<ClienteModelo>{
    return this.http.get<ClienteModelo>(`${this.url}/cliente/${id}`);
  }

  AlmacenarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    console.log("estamos en almacenar registro"+modelo)
    console.log(modelo.id)
    console.log(modelo.ciudadId)
    console.log(modelo.apellido)
    console.log(modelo.nombre)
    console.log(modelo.correoElectronico)
    console.log(modelo.direccion)
    console.log(modelo.documento)
    console.log(modelo.fechaNacimiento)
    console.log(modelo.foto)
    console.log(modelo.numCelular)
    

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
