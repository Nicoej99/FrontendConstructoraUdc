import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ResetearClaveComponent } from './resetear-clave/resetear-clave.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

import { InfoFinancieraComponent } from './info-financiera/info-financiera.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RechazarSolicitudComponent } from './solicitud/rechazar-solicitud/rechazar-solicitud.component';
import { InformeVentasComponent } from './solicitud/informe-ventas/informe-ventas.component';
import { AceptarSolicitudComponent } from './solicitud/aceptar-solicitud/aceptar-solicitud.component';
import { ListarAceptarSolicitudComponent } from './solicitud/listar-aceptar-solicitud/listar-aceptar-solicitud.component';




@NgModule({
  declarations: [
    IniciarSesionComponent,
    CerrarSesionComponent,
    ResetearClaveComponent,
    CambiarClaveComponent,
    RegistrarUsuarioComponent,
    RegistrarClienteComponent,
    EditarClienteComponent,
    EditarUsuarioComponent,
    InfoFinancieraComponent,
    CrearSolicitudComponent,
    EditarSolicitudComponent,
    ListarSolicitudComponent,
    RechazarSolicitudComponent,
    InformeVentasComponent,
    AceptarSolicitudComponent,
    ListarAceptarSolicitudComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    
  
  ]
})
export class SeguridadModule { }
