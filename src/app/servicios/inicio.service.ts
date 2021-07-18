import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelos';
import { ResetPasswordModelo } from '../modelos/resetpassword.modelos';
import { UsuarioModelo } from '../modelos/usuario.modelos';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  

  obtenerCorreo(correo: String): Observable<ClienteModelo>{
    return this.http.get<ClienteModelo>(`${this.url}/Cliente/correo-electronico/${correo}`);
  }

  

 

  
}
