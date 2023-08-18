import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService: UsersService,private navbarService:NavbarService,private router:Router) { }
  usuarios: any[] = [];
  idResidencial:string = "";
  ngOnInit(): void {
   this.idResidencial = localStorage.getItem("auth-residencial")!;
   this.navbarService.show();
  }

  obtenerUsuarios(termino: string) {
    this.usuarioService.obtenerUsuariosPorIdResidencial(termino).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.usuarios = resp;
      },
      error: (resp: any) => {
        console.log(resp);
      }
    })
  }

  eliminarUsuario(id: any) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar este usuario?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe({
          next:(value:any) =>{
            this.obtenerUsuarios(this.idResidencial);
            Swal.fire('Listo!', 'eliminado correctamente', 'success')
          },
          error:(err:any) =>{
            Swal.fire('Error!', err.error.message, 'error')

          },
        })
      } else if (result.isDenied) {
        Swal.fire('Operacion Cancelada', '', 'info')
      }
    })  }

  cambiarEstadoPago(id: any,e:any){
    console.log("entro");
    console.log(e.target.checked)
    let estadoDTO = {
      estado:e.target.checked
    }
    this.usuarioService.cambiarEstadoPago(id,estadoDTO).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (resp: any) => {
        console.log(resp);
      }
    })

  }
  recordarResidencial(e: any) {
    if(e.target.checked){
      localStorage.setItem("auth-residencial",this.idResidencial);
      
    }
  }

  agregarGarage(id:any){
    this.router.navigateByUrl('/inicio/garage/'+this.idResidencial+"/"+id);
  }
}
