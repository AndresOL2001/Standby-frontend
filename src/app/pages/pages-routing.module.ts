import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResidencialesComponent } from './residenciales/residenciales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GarageComponent } from './garage/garage.component';
import { GaragesComponent } from './garages/garages.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'home',component:HomeComponent
      },
      {
        path:'residenciales',component:ResidencialesComponent
      },
      {
        path:'usuarios',component:UsuariosComponent
      },
      {
        path:'residenciales/editar/:id',component:HomeComponent
      },
      {
        path:'garage/:id/:idUsuario',component:GarageComponent
      },
      {
        path:'garages',component:GaragesComponent
      },
      {
        path:'**',redirectTo:'home'
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
