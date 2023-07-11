import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'google-maps',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  apiLoaded: Observable<boolean>;
  residencial:any;
  circles: any[] = [];
  direccion:string = "";
  nombre:string = "";
  accesos: any[] = [];
  
  colors:any[] = ['green','blue','yellow','red','purple','orange'];

  centerMap: google.maps.LatLngLiteral = {
    lat: 29.07497302489944,
    lng: -111.02811814895006,
  };
  center: google.maps.LatLngLiteral = {
    lat: 29.07497302489944,
    lng: -111.02811814895006,
  };


  display: any;
  constructor(httpClient: HttpClient) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library 
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCNmpD_f-vJFakrjcL0X5ugzf9tKjZOM6I', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  moveMap(e: any) { 
  }
  move(e: any) {
    this.display = e.latLng.toJSON();
  }

  generarResidencial() {
    console.log(this.direccion);
    console.log(this.nombre);
    //post
    let position: google.maps.LatLngLiteral = {
      lat: 29.07497302489944,
      lng: -111.02811814895006,
    };

    let options: google.maps.MarkerOptions = { draggable: true, animation: google.maps.Animation.DROP};
    let residencial = {
      position,
      options,
      circle: {
        radius: 10,
        center: position,
      },
      accesos:[]
    }
    this.residencial = residencial;
  }
   getRandomInt(max:any) {
    return Math.floor(Math.random() * max);
  }
  generarAcceso() {
    //POST
    let position: google.maps.LatLngLiteral = {
      lat: 29.07497302489944,
      lng: -111.02811814895006,
    };

    let options: google.maps.MarkerOptions = { draggable: true, animation: google.maps.Animation.DROP, };
    let circleOptions: google.maps.CircleOptions = { fillColor:this.colors[this.getRandomInt(this.colors.length)]};

    let acceso = {
      position,
      options,
      circle: {
        radius: 3,
        center: position,
        options:circleOptions
      }
    }
    this.residencial.accesos.push(acceso);
  }

  

  actualizarPosicion(event: any, acceso: any) {
    //Enviar peticion put
    const newPosition: google.maps.LatLngLiteral = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    acceso.position = newPosition;
    acceso.circle.center = newPosition;
  }

  actualizarPosicionResidencial(event:any,residencial:any){
    //Enviar peticion put
    const newPosition: google.maps.LatLngLiteral = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    residencial.position = newPosition;
    residencial.circle.center = newPosition;
  
  }
}
