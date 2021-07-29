import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { ValidadorVendedorGuard } from 'src/app/guardianes/validador-vendedor.guard';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { EliminarBloqueComponent } from './bloque/eliminar-bloque/eliminar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { InformeCiudadComponent } from './ciudad/informe-ciudad/informe-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminiarInmuebleComponent } from './inmueble/eliminiar-inmueble/eliminiar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { InformacionProyectoComponent } from './proyecto/informacion-proyecto/informacion-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
 {
    path: 'listar-pais',
    component: ListarPaisComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'crear-pais',
    component: CrearPaisComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'editar-pais/:id',
    component: EditarPaisComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'eliminar-pais/:id',
    component: EliminarPaisComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },
  
  {
    path: 'listar-ciudad',
    component: ListarCiudadComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'crear-ciudad',
    component: CrearCiudadComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'editar-ciudad/:id',
    component: EditarCiudadComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'eliminar-ciudad/:id',
    component: EliminarCiudadComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'informe-ciudad',
    component: InformeCiudadComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },
  
  {
    path: 'listar-proyecto',
    component: ListarProyectoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'crear-proyecto',
    component: CrearProyectoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'editar-proyecto/:id',
    component: EditarProyectoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'eliminar-proyecto/:id',
    component: EliminarProyectoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'informacion-proyecto/:id',
    component: InformacionProyectoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },
  
  
  {
    path: 'listar-bloque',
    component: ListarBloqueComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'crear-bloque',
    component: CrearBloqueComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'editar-bloque/:id',
    component: EditarBloqueComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'eliminar-bloque/:id',
    component: EliminarBloqueComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },

  {
    path: 'listar-inmueble',
    component: ListarInmuebleComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'crear-inmueble',
    component: CrearInmuebleComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'editar-inmueble/:id',
    component: EditarInmuebleComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },{
    path: 'eliminar-inmueble/:id',
    component: EliminiarInmuebleComponent,
    canActivate: [ValidadorSesionGuard, ValidadorVendedorGuard]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
