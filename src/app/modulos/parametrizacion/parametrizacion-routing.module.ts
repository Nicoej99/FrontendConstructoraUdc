import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { ValidadorVendedorGuard } from 'src/app/guardianes/validador-vendedor.guard';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path: 'listar-bloque',
    component: ListarBloqueComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'listar-ciudad',
    component: ListarCiudadComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'listar-inmueble',
    component: ListarInmuebleComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'listar-pais',
    component: ListarPaisComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'crear-pais',
    component: CrearPaisComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'editar-pais/:id',
    component: EditarPaisComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'eliminar-pais/:id',
    component: EliminarPaisComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'listar-proyecto',
    component: ListarProyectoComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
