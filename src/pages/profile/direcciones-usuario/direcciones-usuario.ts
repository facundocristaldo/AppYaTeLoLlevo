import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DireccionesUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direcciones-usuario',
  templateUrl: 'direcciones-usuario.html',
})
export class DireccionesUsuarioPage {
  userData:any;
  canDismiss:boolean=false;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage:Storage, 
    private viewCtrl: ViewController
    ) {
      if (this.navParams.data.candismiss){
        this.canDismiss = this.navParams.data.candismiss;
      }
      this.userData = this.storage.get("userData");
      this.storage.ready().then(() => {
      this.storage.get('Email').then(a=>{console.log(a);this.userData.Email=a;});
      this.storage.get('Nombre').then(a=>{console.log(a);this.userData.Nombre=a;});
      this.storage.get('Foto').then(a=>{console.log(a);this.userData.Foto=a;});
    });
    console.log("userdata ",this.userData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DireccionesUsuarioPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
