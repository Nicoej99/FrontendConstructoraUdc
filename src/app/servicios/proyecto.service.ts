import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelos';
import { ImagenProyectoModelo } from '../modelos/imagen-proyecto.modelos';
import { ProyectoModelo } from '../modelos/proyecto.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<ProyectoModelo[]>{
    return this.http.get<ProyectoModelo[]>(`${this.url}/proyecto`);
  }

  BuscarRegistro(id : number): Observable<ProyectoModelo>{
    return this.http.get<ProyectoModelo>(`${this.url}/proyecto/${id}`);
  }

  BuscarProyectoCiudad(id ?: number): Observable<ProyectoModelo[]>{
    return this.http.get<ProyectoModelo[]>(`${this.url}/ciudads/${id}/proyectos`);
    
  }

  AlmacenarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    console.log(modelo)
    return this.http.post<ProyectoModelo>(
      `${this.url}/proyecto`,
      {
        codigo: modelo.codigo,
        nombre: modelo.nombre,
        imagen: modelo.imagen,
        descripcion: modelo.descripcion,
        ciudadId: modelo.ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    return this.http.put<ProyectoModelo>(
      `${this.url}/proyecto/${modelo.id}`,
      {
        codigo: modelo.codigo,
        nombre: modelo.nombre,
        imagen: modelo.imagen,
        descripcion: modelo.descripcion,
        ciudadId: modelo.ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<ProyectoModelo> {
    return this.http.delete<ProyectoModelo>(
      `${this.url}/proyecto/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  CargarArchivo(formData: FormData): Observable<ImagenProyectoModelo> {
    return this.http.post<ImagenProyectoModelo>(
      `${this.url}/CargarImagenProyecto`,
      formData,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  
}
