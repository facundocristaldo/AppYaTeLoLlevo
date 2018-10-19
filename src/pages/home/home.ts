import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
import * as $ from "jquery";
 import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario : string = "";
  contras : string = "";
  userId : string = "";

  constructor(
    public navCtrl: NavController, 
    private fb: Facebook,
    private alertCtrl: AlertController,
    private http:HttpserviceProvider) {

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
          // this.presentAlert("logueado",'Loeguado con Facebook! ' + res.status,"ok");
          this.userId = res.authResponse.userID;
          this.LogInEvent(true);
        })
        .catch(e => this.presentAlert("Error",'Error al loguearse en Facebook' , "ok"));

    }
  }

  gotoRegister() {
    this.navCtrl.push(RegistroPage);
  }

  LogInEvent(esRedSocial : Boolean) {
    if (esRedSocial){
      let valid = this.http.login("","",true,this.userId);
      if (valid){
        this.navCtrl.push(CatalogoEmpresasPage,this.userId);
      }
    }else if (this.isValidForm()) {
      let valid = this.http.login(this.usuario,this.contras,false,"");
      if (valid) {
        this.navCtrl.push(CatalogoEmpresasPage,this.usuario);
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
