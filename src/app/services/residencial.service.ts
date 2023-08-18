import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResidencialService {
  //AQUI GENERAR PETICIONES HTTP
  constructor(private httpClient: HttpClient) { }

  credencialResidencial(residencial: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" });

    return this.httpClient.post(environment.url + "/api/residencial", residencial, { headers });
  }

  crearAccesos(acceso: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" });

    return this.httpClient.post(environment.url + "/api/accesos", acceso, { headers });

  }

  editarAcceso(acceso: any, id: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" });

    return this.httpClient.put(environment.url + "/api/accesos/" + id, acceso, { headers });

  }

  obtenerAccesosPorIdResidencial(id: any) {
    return this.httpClient.get(environment.url + "/api/accesos/residencial/" + id);

  }

  obtenerResidenciales() {

    return this.httpClient.get(environment.url + "/api/residencial");

  }

  editarResidencial(residencial: any, id: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" });

    return this.httpClient.put(environment.url + "/api/residencial/" + id, residencial, { headers });

  }

  obtenerResidencialPorId(id: any) {
    return this.httpClient.get(environment.url + "/api/residencial/" + id);

  }


  eliminarResidencial(id: any) {
    return this.httpClient.delete(environment.url + "/api/residencial/" + id);

  }

}
