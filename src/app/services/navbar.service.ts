import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean = false;
  open:boolean = false;
  admin:boolean = false;
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor() { 
    this.sidebarVisibilityChange.subscribe((value) => {
      this.open = value;
    })
   }
   îsAdmin(){
    this.admin = true;
   }
   isUser(){
    this.admin = false;
   }
  hide() { this.visible = false; }

  show() { this.visible = true; }
}
