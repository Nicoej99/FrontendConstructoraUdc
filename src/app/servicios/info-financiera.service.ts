import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelos';
import { InfoFinancieraModelo } from '../modelos/info-financiera';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InfoFinancieraService {

  entity = '/infofinanciera';
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
  private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<InfoFinancieraModelo[]>{
    return this.http.get<InfoFinancieraModelo[]>(`${this.url}/infofinanciera`);
  }

  ListarCiudad(): Observable<InfoFinancieraModelo[]>{//ciudades 
    return this.http.get<InfoFinancieraModelo[]>(`${this.url}/infofinanciera`);
  }


  BuscarRegistro(id : number): Observable<InfoFinancieraModelo>{
    return this.http.get<InfoFinancieraModelo>(`${this.url}/infofinanciera/${id}`);
  }

  AlmacenarRegistro(modelo: InfoFinancieraModelo): Observable<InfoFinancieraModelo> {
    console.log("Se va pal back"+modelo)
    return this.http.post<InfoFinancieraModelo>(
      `${this.url}/infofinanciera`,     
      {
       
        total_ingresos: modelo.total_ingresos,
        datos_trabajo: modelo.datos_trabajo,
        tiempo_trabajo_actual: modelo.tiempo_trabajo_actual,
        nombre_ref_fam: modelo.nombre_ref_fam,
        tel_ref_fam: modelo.tel_ref_fam,
        nombre_ref_personal: modelo.nombre_ref_personal,
        tel_ref_personal: modelo.tel_ref_personal,
        clienteId: modelo.clienteId
        
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: InfoFinancieraModelo): Observable<InfoFinancieraModelo> {
    return this.http.put<InfoFinancieraModelo>(
      `${this.url}/infofinanciera/${modelo.id}`,
      {
        total_ingresos: modelo.total_ingresos,
        datos_trabajo: modelo.datos_trabajo,
        tiempo_trabajo_actual: modelo.tiempo_trabajo_actual,
        nombre_ref_fam: modelo.nombre_ref_fam,
        tel_ref_fam: modelo.tel_ref_fam,
        nombre_ref_personal: modelo.nombre_ref_personal,
        tel_ref_personal: modelo.tel_ref_personal,
        clienteId: modelo.clienteId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<InfoFinancieraModelo> {
    return this.http.delete<InfoFinancieraModelo>(
      `${this.url}/infofinanciera/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }



  CustomerRegistering(cliente: InfoFinancieraModelo): Observable<InfoFinancieraModelo> {
    return this.http.post<InfoFinancieraModelo>(`${this.http}${this.entity}`, cliente, {
      headers: new HttpHeaders({})
    });
  }
}
