import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarageServiceService {

  constructor(private httpClient: HttpClient) { }

  obtenerGarages() {
    return this.httpClient.get(environment.url + "/api/garages");

  }
}
