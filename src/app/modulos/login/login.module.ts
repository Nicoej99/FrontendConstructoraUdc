import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ListarLoginComponent } from './listar-login/listar-login.component';
import { CrearLoginComponent } from './crear-login/crear-login.component';
import { EditarLoginComponent } from './editar-login/editar-login.component';
import { EliminarLoginComponent } from './eliminar-login/eliminar-login.component';


@NgModule({
  declarations: [
    ListarLoginComponent,
    CrearLoginComponent,
    EditarLoginComponent,
    EliminarLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
