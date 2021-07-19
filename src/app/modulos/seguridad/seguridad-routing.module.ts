import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorNoSesionGuard } from 'src/app/guardianes/validador-no-sesion.guard';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { ValidadorVendedorGuard } from 'src/app/guardianes/validador-vendedor.guard';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ResetearClaveComponent } from './resetear-clave/resetear-clave.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ValidadorAdminGuard } from 'src/app/guardianes/validador-admin.guard';
import { InfoFinancieraComponent } from './info-financiera/info-financiera.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path: 'editar-cliente/:id',
    component: EditarClienteComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'info-financiera',
    component: InfoFinancieraComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'registrar-usuario',
    component: RegistrarUsuarioComponent,
    canActivate:[ValidadorSesionGuard, ValidadorAdminGuard]
  },
  {
    path: 'registrar-cliente',
    component: RegistrarClienteComponent,
    canActivate:[ValidadorSesionGuard, ValidadorAdminGuard]
  },
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent,
    canActivate:[ValidadorNoSesionGuard]
  },
  {
    path : 'cerrar-sesion',
    component : CerrarSesionComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'resetear-clave',
    component: ResetearClaveComponent,
    canActivate:[ValidadorNoSesionGuard]
  },
  {
    path: 'cambiar-clave',
    component : CambiarClaveComponent,
    canActivate:[ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
