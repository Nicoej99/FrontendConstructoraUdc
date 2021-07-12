import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    component: ListarBloqueComponent
  },{
    path: 'listar-ciudad',
    component: ListarCiudadComponent
  },{
    path: 'listar-inmueble',
    component: ListarInmuebleComponent
  },{
    path: 'listar-pais',
    component: ListarPaisComponent
  },{
    path: 'crear-pais',
    component: CrearPaisComponent
  },{
    path: 'editar-pais/:id',
    component: EditarPaisComponent
  },{
    path: 'eliminar-pais/:id',
    component: EliminarPaisComponent
  },{
    path: 'listar-proyecto',
    component: ListarProyectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
