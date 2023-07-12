import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

declare var navigator: any;

@Component({
  selector: 'google-maps',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {

  nombresAccesos: string[] = [];
  direccionesAccesos: string[] = [];
  preciosAccesos: number[] = [];

  location!: GeolocationCoordinates;
  apiLoaded: Observable<boolean>;
  residencial:any;
  circles: any[] = [];

  direccion:string = "";
  nombre:string = "";
  numSerie:string = "";
  idResidencial:string = "";
  
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
  constructor(private httpClient: HttpClient) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library 
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCNmpD_f-vJFakrjcL0X5ugzf9tKjZOM6I', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.successCallback.bind(this), this.errorCallback.bind(this));
      } else {
        console.log('La geolocalización no es compatible en este navegador.');
      }
  }

  successCallback(position: GeolocationPosition) {
    this.location = position.coords;
    console.log('Latitud: ', this.location.latitude);
    console.log('Longitud: ', this.location.longitude);
  }

  errorCallback(error: any) {
    console.error('Error al obtener la ubicación: ', error);
  }

  moveMap(e: any) { 
  }
  move(e: any) {
    this.display = e.latLng.toJSON();
  }

  generarResidencial() {
    
    //post
    let position: google.maps.LatLngLiteral = {
      lat: this.location?.latitude,
      lng: this.location?.longitude,
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

    // const data = {
    //   nombre: this.nombre,
    //   direccion: this.direccion,
    //   numeroSerie: this.generateRandomNumber(),
    //   latitudResidencial: this.residencial.position.lat,
    //   longitudResidencial: this.residencial.position.lng
    // };

    // const headers  = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" }); 

    // this.httpClient.post(crearResidencialUrl, data, { headers: headers } ).subscribe({
    //   next:(resp:any) => {
    //     this.numSerie = resp.numSerie;
    //     this.idResidencial = resp.idResidencial
    //     console.log('Respuesta: ', resp);
    //   },
    //   error:(test:any) => {
    //     console.log("Error!!", test.error.message)
    //   }
    // })

  }
  
  generateRandomNumber(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

   getRandomInt(max:any) {
    return Math.floor(Math.random() * max);
  }
  generarAcceso() {
    //POST
    let position: google.maps.LatLngLiteral = {
      lat: this.residencial.position.lat,
      lng: this.residencial.position.lng
    };

    let options: google.maps.MarkerOptions = { draggable: true, animation: google.maps.Animation.DROP };
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

    // const headers  = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" }); 

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

  guardarTodo(){

    const crearAccesoUrl = 'http://24.199.122.158:5000/api/accesos';
    const crearResidencialUrl = 'http://24.199.122.158:5000/api/residencial';

    // this.residencial.accesos.forEach((acceso:any, index: number) => {
    //   console.log('Nombres ingresados:', this.nombresAccesos[index]);
    //   console.log('Direcciones ingresadas:', this.direccionesAccesos[index]);
    //   console.log('Precios ingresados:', this.preciosAccesos[index]);
    //   console.log('Latitud:', acceso.position.lat);
    //   console.log('Longitud', acceso.position.lng);
    // });


    // console.log('Nombre Residencial', dataResidencial.nombre);
    // console.log('Direccion Residencial:', dataResidencial.direccion);
    // console.log('Numero de serie residencial', dataResidencial.numeroSerie);
    // console.log('Latitud', dataResidencial.latitudResidencial);
    // console.log('Longitud', dataResidencial.longitudResidencial);

    const headers  = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" });

    const dataResidencial = {
      nombre: this.nombre,
      direccion: this.direccion,
      numeroSerie: this.generateRandomNumber(),
      latitudResidencial: this.residencial.position.lat,
      longitudResidencial: this.residencial.position.lng
    };

    this.httpClient.post(crearResidencialUrl, dataResidencial, { headers: headers } ).subscribe({
      next:(resp:any) => {
        this.numSerie = resp.numSerie;
        this.idResidencial = resp.idResidencial
        console.log('Respuesta: ', resp);

        //------------------------------------- PARA GUARDAR LOS ACCESOS -------------------------------------

        this.residencial.accesos.forEach((acceso:any, index: number) => {

          const dataAcceso = {
            idResidencial:this.idResidencial,
            latitudCaseta: acceso.position.lat,
            longitudCaseta: acceso.position.lng,
            direccion: this.direccionesAccesos[index],
            nombre: this.nombresAccesos[index],
            precio: this.preciosAccesos[index]
          };
      
          this.httpClient.post(crearAccesoUrl, dataAcceso, { headers: headers } ).subscribe({
            next:(resp:any) => {
              this.numSerie = resp.numSerie;
              this.idResidencial = resp.idResidencial
              console.log('Respuesta: ', resp);
            },
            error:(test:any) => {
              console.log("Error!!", test.error.message)
            }
          })
        }); //fin post


      },
      error:(test:any) => {
        console.log("Error!!", test.error.message)
      }
    }); //Fin post

  }//fin metodo
}
