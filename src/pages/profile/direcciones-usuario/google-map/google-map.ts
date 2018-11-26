import { Component, Input} from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpserviceProvider } from '../../../../providers/httpservice/httpservice';

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var google;
let autocomplete = null;
//ubicacion se usa para persistir
let ubicacion = {
  Direccion : '',
  lat: '',
  lng: ''
}

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  @Input() email: string;
  map : any;
  pest: number = 1;

  auxLat : number = 0;
  auxLng : number = 0;
  auxRadio : number = 300;

  AgregarMsg : number = 0;
  formEmp = {
    Rut : '',
    Nombre : '',
    URLocator : '',
    NombreRubro : '',
    Direccion : '',
    Descripcion : '',
    UserName : '',
    User : '',
    Pass : '',
    Logo: '',
    lat: '',
    lng: ''
  }
  constructor(public plt:Platform,
    private http:HttpserviceProvider, 
    private alertCtl:AlertController, 
    private geo : Geolocation
    ) {
    console.log('Hello GoogleMapComponent Component');
    
  }
  ngOnInit(){
    var input = document.getElementById('form1Direccion');
    var options = {
      types: ['address'],
      componentRestrictions: {country: 'uy'}
    };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.90595, lng: -56.16381749999999},
      zoom: 13,
      gestureHandling: 'greedy'
    });
    autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function() {
      console.log('Autocomplete dentro: '+autocomplete);
  
      var place = autocomplete.getPlace();
  
      console.log('Nuevo place');
      if (place!= null && place != undefined && place.geometry!= null && place.geometry!=undefined){
        ubicacion.Direccion = place.formatted_address;
        ubicacion.lat = place.geometry.location.lat().toString();
        ubicacion.lng = place.geometry.location.lng().toString();
        console.log("ubicacion elegida " ,ubicacion);
      
        //muestro mapa
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
          zoom: 13,
          gestureHandling: 'greedy'
        });
    
        console.log(google);
        var ubicLatLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
        var contentString = '<div>'+ubicacion.Direccion+'</div>';
      var marker = new google.maps.Marker({
        position: ubicLatLng,
        map: this.map,
        title: ubicacion.Direccion
      });

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function(){
        infowindow.open(this.map, marker);
      });
      
    }
  });
  console.log("Va a buscar pos actual");
  this.plt.ready().then((readySource)=>{

    this.geo.getCurrentPosition().then(  res=>{
      console.log("Pos Actual ",res);
      var response :any = res ;
      
      let lat= response.coords.latitude;
      let lng= response.coords.longitude;
      let p = {
        lat:lat,
        lng:lng
      }
      console.log ("p=",p);
      var marker2 = new google.maps.Marker({
        position: p,
        map: this.map,
        title: "Ubicacion Actual"
      });
      var contentString = '<div>'+"Ubicacion actual"+'</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker2.addListener('click', function(){
        infowindow.open(this.map, marker2);
      });
    
      var contentString2 = '<div>'+ubicacion.Direccion+'</div>';

      var infowindow2 = new google.maps.InfoWindow({
        content: contentString2
      });

      marker2.addListener('click', function(){
        infowindow2.open(this.map, marker2);
      });
      }).catch(()=>{ 
        console.log("No encuentra ubicacion");
      });
    });
  }

  ActualizarDireccion(){
    console.log("Datos enviados",this.email,ubicacion);
    this.http.ActualizarDireccion(this.email,ubicacion).subscribe(
      response=>{
        console.log(response);
        if (response.status=201){
        let alert = this.alertCtl.create({
          title: "Bien",
          message: 'Los datos se actualizaron correctamente.',
          buttons: ["Ok"]
        });
        alert.present();
      }else{
        let alert = this.alertCtl.create({
          title: "Error",
          message: 'Algo salió mal.',
          buttons: ["Ok"]
        });
        alert.present();
      }
      }
    );
  }
}
