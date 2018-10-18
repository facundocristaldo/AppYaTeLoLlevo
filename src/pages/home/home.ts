import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
import * as $ from "jquery";
 import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fb: Facebook,private alertCtrl: AlertController) {

  }

  presentAlert( titulo:string, subtitulo:string, mensaje:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [mensaje]
    });
    alert.present();
  }
  socialSignIn(socialMedia: string) {
    console.log("Clickeado inicio de sesion con red social: " + socialMedia);
    if (socialMedia == 'facebook') {
      this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          this.presentAlert("logueado",'Logged into Facebook! ' + res.status,"ok");
          this.LogInEvent(true);
        })
        .catch(e => this.presentAlert("Error",'Error logging into Facebook' , "ok"));

    }
  }

  gotoRegister() {
    this.navCtrl.push(RegistroPage);
  }

  LogInEvent(esRedSocial : Boolean) {
    if (esRedSocial){
      console.log("Hacer llamado al metodo para loguearse con red social");
      if (true){
        this.navCtrl.push(CatalogoEmpresasPage,{'username':'usuario'});
      }
    }else if (this.isValidForm()) {
      console.log("Hacer llamado al metodo para loguearse");
      if (true) {
        this.navCtrl.push(CatalogoEmpresasPage,{'username':'usuario'});
      }
    } else {
      return false;
    }
  }

  isValidForm(): Boolean {
    var isValid = true;
    $("#UserPswForm input").each(function () {
      var elem = $(this);
      if (elem.val() == "") {
        this.presentAlert("Error","Algunos input están vacíos!","OK");
        isValid = false;
      }
    });
    return isValid;
  }
}
