import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelos';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url: String = DatosGenerales.url;
  datosDeSesion: BehaviorSubject<UsuarioModelo> = new BehaviorSubject<UsuarioModelo>(new UsuarioModelo());

  constructor(private http: HttpClient) {
    this.VerificarSesion();
  }

  VerificarSesion() {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let datosEnObjeto: UsuarioModelo = JSON.parse(datos);
      datosEnObjeto.isLoggedIn = true;
      this.RefrescarDatosSesion(datosEnObjeto);
    }
  }


  VerificarUsuario(modelo: UsuarioModelo): Observable<any> {
    return this.http.post<any>(
      `${this.url}/identificar-usuario`,
      {
        correo: modelo.correo,
        clave: modelo.clave
      },
      {
        headers: new HttpHeaders({

        })
      });
  }

  RefrescarDatosSesion(usuarioModelo: UsuarioModelo) {
    this.datosDeSesion.next(usuarioModelo);
  }

  ObtenerDatosSesion() {
    return this.datosDeSesion.asObservable();
  }

  AlmacenarDatosSesionEnLocal(usuarioModelo: UsuarioModelo): Boolean {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      return false;
    } else {
      let datosString = JSON.stringify(usuarioModelo);
      localStorage.setItem("session-data", datosString);
      usuarioModelo.isLoggedIn = true;
      this.DefinirRol(usuarioModelo);
      usuarioModelo.isAdmin = true;
      console.log("jkahsldgfhkujsadgfhjasgfjhkasdfg")
      this.RefrescarDatosSesion(usuarioModelo);
      return true;
    }
  }

  RemoverLocalStorage() {
    let datos = localStorage.removeItem("session-data");
    this.RefrescarDatosSesion(new UsuarioModelo());
  }

  ObtenerToken() {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let obj: UsuarioModelo = JSON.parse(datos);
      return obj.tk;
    } else {
      return "";
    }
  }

  DefinirRol(modelo: UsuarioModelo) {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let rol: UsuarioModelo = JSON.parse(datos);
      
      switch (String(rol.role)) {
        case "6068f2c6b4388d860e4e2a3a":
          alert("Admin")
          modelo.isAdmin = true;
          return true;
          break;
        case "6068f354b4388d860e4e2a3b":
          alert("Vendedor")
          modelo.isVendedor = true;
          return true;
          break;
        default:
          return false;
      }
    } else {
      return false;
    }
  }


  ValidarSesionPorToken(): boolean {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let obj: UsuarioModelo = JSON.parse(datos);
      return true;
    } else {
      return false;
    }
  }




}
