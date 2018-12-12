import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';
import { PermisosUsuarioPage } from './permisos-usuario/permisos-usuario';
import { DatosUsuarioPage } from './datos-usuario/datos-usuario';
import { DireccionesUsuarioPage } from './direcciones-usuario/direcciones-usuario';
import { HistorialOrdenesPage } from './historial-ordenes/historial-ordenes';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData:any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  DatosUsuario = DatosUsuarioPage;
  DireccionesUsuario = DireccionesUsuarioPage;
  PermisosUsuario = PermisosUsuarioPage;
  OrdenesUsuario = HistorialOrdenesPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpserviceProvider, private storage:Storage) {
    this.userData = this.storage.get("userData");
    this.storage.ready().then(() => {
      this.storage.get('Email').then(a=>{console.log(a);this.userData.Email=a;});
      this.storage.get('Nombre').then(a=>{console.log(a);this.userData.Nombre=a;});
      this.storage.get('Foto').then(a=>{console.log(a);this.userData.Foto=a;});
      this.storage.get('Telefono').then(a=>{console.log(a);this.userData.Telefono=a;});
    });
    console.log("userdata ",this.userData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    
  }
  
}
