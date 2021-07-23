import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ImagenProyectoModelo } from '../modelos/imagen-proyecto.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  descargarArchivos(type: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/archivos/${type}`);
  }

  descargarArchivo(type : number, filename : String): Observable<String>{

    return this.http.get<String>(`${this.url}/archivo/${type}/${filename}`);
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

  CargarCliente(formData: FormData): Observable<ImagenProyectoModelo> {
    return this.http.post<ImagenProyectoModelo>(
      `${this.url}/CargarImagenCliente`,
      formData,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  

  
}
