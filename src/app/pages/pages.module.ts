import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { GoogleMapComponent } from '../components/google-map/google-map.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResidencialesComponent } from './residenciales/residenciales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GarageComponent } from './garage/garage.component';
import { GaragesComponent } from './garages/garages.component';


@NgModule({
  declarations: [
    HomeComponent,
    GoogleMapComponent,
    ResidencialesComponent,
    UsuariosComponent,
    GarageComponent,
    GaragesComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    PagesRoutingModule,
    FormsModule
  ],
  exports:[GoogleMapComponent]
})
export class PagesModule { }
