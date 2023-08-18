import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  login(loginUser:any){
    return this.http.post(environment.url+"/api/auth/login",loginUser)
  }

  obtenerUsuariosPorIdResidencial(idResidencial:string){
    return this.http.get(environment.url+"/api/auth/usuarios/"+idResidencial)
  }

  cambiarEstadoPago(id:string,estadoDTO:any){
    return this.http.post(environment.url+"/api/auth/cambiarestadopago/usuario/"+id,estadoDTO);
  }

  eliminarUsuario(id:string){
    return this.http.delete(environment.url+"/api/auth/"+id);

  }
}
