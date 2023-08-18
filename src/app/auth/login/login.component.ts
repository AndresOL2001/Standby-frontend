import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:UsersService,private router:Router,public navbar:NavbarService) { }
  correo:string="";
  contrasena:string="";
  ngOnInit(): void {
     this.navbar.hide();
     this.correo = localStorage.getItem('celular-standby')!;
  }

  guardarUsuario(e:any){
   // console.log(this.correo)
    if(e.target.checked){
      localStorage.setItem('celular-standby',this.correo);
    }
  }

  iniciarSesion(){
    let loginUser = {
      celular:this.correo,
      contraseña:this.contrasena
    }
     this.authService.login(loginUser).subscribe({
      next:(resp:any) => {
        localStorage.setItem('auth-standby',resp.token);
        this.router.navigateByUrl('/inicio')
        Swal.fire("Listo!","Inicio de sesión correcto","success");
      },
      error:(err:any) => {
        console.log(err)
        Swal.fire("Error","Correo y/o contraseña incorrecta","error");

      }
    })
  }
}
