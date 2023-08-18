import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  constructor(private navbarService:NavbarService,private activatedRoute:ActivatedRoute) { }
  idUsuario:string="";
  ngOnInit(): void {
    this.navbarService.show();
    this.idUsuario = this.activatedRoute.snapshot.params["idUsuario"];
  }

}
