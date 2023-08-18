import { Component, OnInit } from '@angular/core';
import { GarageServiceService } from 'src/app/services/garage-service.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {

  constructor(private navbarService:NavbarService,private garageService:GarageServiceService) { }
  garages:any = [];
  ngOnInit(): void {
    this.navbarService.show();
    this.garageService.obtenerGarages().subscribe({
      next:(resp:any) => {
        this.garages = resp;
        console.log(resp);
      }
    })
  }

}
