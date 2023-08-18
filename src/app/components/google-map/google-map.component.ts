import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, finalize, forkJoin, map, of } from 'rxjs';
import { ResidencialService } from 'src/app/services/residencial.service';
import Swal from 'sweetalert2';

declare var navigator: any;

@Component({
  selector: 'google-maps',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  location!: any;
  apiLoaded: Observable<boolean>;
  residencial: any = {};
  usuarioId:string = "";
  direccion: string = "";
  nombre: string = "";
  numSerie: string = "";
  idResidencial: string = "";
  radio: number = 0;
  colors: any[] = ['green', 'blue', 'yellow', 'red', 'purple', 'orange'];
  esGarage:boolean = false;

  centerMap: google.maps.LatLngLiteral = {
    lat: 29.07497302489944,
    lng: -111.02811814895006,
  };
  center: google.maps.LatLngLiteral = {
    lat: 29.07497302489944,
    lng: -111.02811814895006,
  };

  display: any;
  editar: boolean = false;
  constructor(private httpClient: HttpClient, private residencialService: ResidencialService, private activateRoute: ActivatedRoute) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library 
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization
    this.residencial.accesos! = [];
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7OWr5lnkavYApHdVUu6ywbjfKgXwyfxk', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
      if(activateRoute.snapshot.url[0].path == 'garage'){
        this.esGarage = true;
      }
    //Check if its updating or creating;
    if (activateRoute.snapshot.params['id']) {
      let idResidencial = activateRoute.snapshot.params['id'];
      this.usuarioId  = activateRoute.snapshot.params['idUsuario'];
      this.editar = true;
      this.residencialService.obtenerResidencialPorId(idResidencial).subscribe(((resp: any) => {
        this.direccion = resp.direccion;
        this.nombre = resp.nombre;
        this.radio = resp.radio;
        this.generarResidencial(resp);
        this.residencialService.obtenerAccesosPorIdResidencial(idResidencial).subscribe(((resp: any) => {
          resp.forEach((acceso: any) => {
            this.generarAcceso(acceso);
          });
        }))

      }))

    } else {
      this.editar = false;
    }

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

  generarResidencial(residencialBD?: any) {
    //post
    if (this.editar) {
      console.log("ajksdjkasd")
      let position: google.maps.LatLngLiteral = {
        lat: Number(residencialBD.latitudResidencial),
        lng: Number(residencialBD.longitudResidencial),
      };
      let options: google.maps.MarkerOptions = { draggable: true };
      let residencial = {
        idResidencial: residencialBD.idResidencial,
        numeroSerie: residencialBD.numeroSerie,
        position,
        options,
        circle: {
          radius: this.radio,
          center: position,
        },
        accesos: []
      }
      this.residencial = residencial;
      console.log(residencial);
    } else {
      let position: google.maps.LatLngLiteral = {
        lat: this.centerMap?.lat,
        lng: this.centerMap?.lng,
      };

      let options: google.maps.MarkerOptions = { draggable: true };
      let residencial = {
        position,
        options,
        circle: {
          radius: this.radio,
          center: position,
        },
        accesos: []
      }
      this.residencial = residencial;
      console.log(this.residencial);
    }



  }

  radioChange(e: any) {
    this.residencial.circle.radius = Number(e.target.value);
  }
  radioAccesoChange(e: any, acceso: any) {
    acceso.circle.radius = Number(e.target.value);
  }

  actualizarPosicionResidencial(event: any, residencial: any) {
    //Enviar peticion put
    const newPosition: google.maps.LatLngLiteral = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    residencial.position = newPosition;
    residencial.circle.center = newPosition;

  }
  generateRandomNumber(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
  }
  generarAcceso(accesoBD?: any) {
    //POST
    console.log(accesoBD)
    if (this.editar && accesoBD != null) {
      console.log("entro")
      let position: google.maps.LatLngLiteral = {
        lat: Number(accesoBD.latitudCaseta),
        lng: Number(accesoBD.longitudCaseta)
      };
      let options: google.maps.MarkerOptions = { draggable: true };
      let circleOptions: google.maps.CircleOptions = { fillColor: this.colors[this.getRandomInt(this.colors.length)] };
      let acceso = {
        id: accesoBD.idAcceso,
        position,
        options,
        circle: {
          radius: accesoBD.radio,
          center: position,
          options: circleOptions
        },
        nombre: accesoBD.nombre,
        direccion: accesoBD.direccion,
        precio: accesoBD.precio,
        radio: accesoBD.radio,
        longitudCaseta: accesoBD.longitudCaseta,
        latitudCaseta: accesoBD.latitudCaseta

      }
      console.log(acceso);
      this.residencial.accesos.push(acceso);
    } else {
      let position: google.maps.LatLngLiteral = {
        lat: this.residencial.position.lat,
        lng: this.residencial.position.lng
      };

      let options: google.maps.MarkerOptions = { draggable: true };
      let circleOptions: google.maps.CircleOptions = { fillColor: this.colors[this.getRandomInt(this.colors.length)] };

      let acceso = {
        position,
        options,
        circle: {
          radius: 3,
          center: position,
          options: circleOptions
        }
      }
      this.residencial.accesos.push(acceso);
    }


    // const headers  = new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" }); 

  }

  actualizarPosicion(event: any, acceso: any) {
    //Enviar peticion put
    const newPosition: google.maps.LatLngLiteral = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    if (this.editar) {//update
      acceso.latitudCaseta = Number(event.latLng.lat());
      acceso.longitudCaseta = Number(event.latLng.lng());
      acceso.position = newPosition;
      console.log(acceso);
    } else {//create
      acceso.position = newPosition;

    }
    acceso.circle.center = newPosition;
  }



  guardarTodo() {
    Swal.showLoading();
    if (this.editar) {
      const dataResidencial = {
        nombre: this.nombre,
        direccion: this.direccion,
        numeroSerie: this.residencial.numeroSerie,
        latitudResidencial: this.residencial.position.lat,
        longitudResidencial: this.residencial.position.lng,
        radio: this.residencial.circle.radius
      };
      this.residencialService.editarResidencial(dataResidencial, this.residencial.idResidencial).subscribe({
        next: (resp: any) => {
          Swal.fire("Listo!", "Residencial editada correctamente", "success");
          const accessObservables = this.residencial.accesos.map((acceso: any, index: number) => {
            const dataAcceso = {
              idAcceso: acceso.id != null ? acceso.id : 0,
              idResidencial: this.residencial.idResidencial,
              latitudCaseta: acceso.latitudCaseta,
              longitudCaseta: acceso.longitudCaseta,
              direccion: acceso.direccion,
              nombre: acceso.nombre,
              precio: acceso.precio,
              radio: acceso.circle.radius,
              garage: this.esGarage,
              usuarioId:this.usuarioId
            };
           /*  console.log(dataAcceso.idResidencial);
            console.log(dataAcceso.idAcceso); */
            if (dataAcceso.idAcceso == 0) {
              console.log("ENTRO A CREACIÓN UWUWUWU")
              return this.residencialService.crearAccesos(dataAcceso)
                .pipe(
                  catchError((error) => {
                    console.log('Error!!', error.error.message);
                    throw error;
                  })
                );
            } else {
              return this.residencialService.editarAcceso(dataAcceso, dataAcceso.idAcceso)
                .pipe(
                  catchError((error) => {
                    console.log('Error!!', error.error.message);
                    throw error;
                  })
                );
            }

          });
          forkJoin(accessObservables)
            .pipe(
              catchError((error) => {
                console.log('Error!!', error.error.message);
                throw error;
              }),
              finalize(() => {
                // This block will run regardless of success or error
                Swal.fire("Listo!", "Residencial Editada correctamente", "success");
                //this.residencial = null;
                this.residencial.accesos = [];

              })
            )
            .subscribe((accessResponses: any) => {
              accessResponses.forEach((resp: any) => {
                this.numSerie = resp.numSerie;
                this.idResidencial = resp.idResidencial;
                console.log('Respuesta: ', resp);
              }), finalize(() => {
                Swal.fire("Error!", resp.error.error, "error");

              });
            });
        },
        error: (resp: any) => {
          Swal.fire("Error!", resp.error.error, "error");

        }
      })
    } else {
      const dataResidencial = {
        nombre: this.nombre,
        direccion: this.direccion,
        numeroSerie: this.generateRandomNumber(),
        latitudResidencial: this.residencial.position.lat,
        longitudResidencial: this.residencial.position.lng,
        radio: this.residencial.circle.radius
      };
      this.residencialService.credencialResidencial(dataResidencial)
        .pipe(
          catchError((error) => {
            console.log('Error!!', error.error.message);
            throw error; // Rethrow the error to continue error handling
          })
        )
        .subscribe((resp: any) => {
          this.numSerie = resp.numSerie;
          this.idResidencial = resp.idResidencial;
          console.log('Respuesta: ', resp);

          const accessObservables = this.residencial.accesos.map((acceso: any, index: number) => {
            const dataAcceso = {
              idResidencial: this.idResidencial,
              latitudCaseta: acceso.position.lat,
              longitudCaseta: acceso.position.lng,
              direccion: acceso.direccion,
              nombre: acceso.nombre,
              precio: acceso.precio,
              radio: acceso.circle.radius
            };
            return this.residencialService.crearAccesos(dataAcceso)
              .pipe(
                catchError((error) => {
                  console.log('Error!!', error.error.message);
                  throw error;
                })
              );
          });

          forkJoin(accessObservables)
            .pipe(
              catchError((error) => {
                console.log('Error!!', error.error.message);
                throw error;
              }),
              finalize(() => {
                // This block will run regardless of success or error
                Swal.fire("Listo!", "Residencial Creada correctamente", "success");
                this.residencial = null;
                this.residencial.accesos = [];

              })
            )
            .subscribe((accessResponses: any) => {
              accessResponses.forEach((resp: any) => {
                this.numSerie = resp.numSerie;
                this.idResidencial = resp.idResidencial;
                console.log('Respuesta: ', resp);
              }), finalize(() => {

              });
            });
        });
    }

  }
}
