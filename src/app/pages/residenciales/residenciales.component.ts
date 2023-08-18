import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ResidencialService } from 'src/app/services/residencial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-residenciales',
  templateUrl: './residenciales.component.html',
  styleUrls: ['./residenciales.component.css']
})
export class ResidencialesComponent implements OnInit {

  constructor(private residencialService: ResidencialService,private navbarService:NavbarService) { }
  residenciales: any[] = [];
  ngOnInit(): void {
    this.navbarService.show();
    this.obtenerResidenciales();
  }

  private obtenerResidenciales() {
    this.residencialService.obtenerResidenciales().subscribe(((resp: any) => {
      this.residenciales = resp;
    }));
  }

  eliminarResidencial(idResidencial: any) {
    Swal.fire({
      title: 'Deseas eliminar esta residencial?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.residencialService.eliminarResidencial(idResidencial).subscribe({
          next:(resp:any) => {
            this.obtenerResidenciales();
          Swal.fire('Listo!!', 'Eliminado correctamente', 'success')
            
        },error:(err:any) => {
          console.log(err);
          Swal.fire('Error!!', err.error.mensaje, 'error')

        }})
      } else if (result.isDenied) {

      }
    })

  }

}
