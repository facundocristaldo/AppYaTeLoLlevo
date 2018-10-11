import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
import * as $ from "jquery";
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController/*, private fb: Facebook*/) {

  }

  socialSignIn(socialMedia: string) {
    console.log("Clickeado inicio de sesion con red social: " + socialMedia);
    // if (socialMedia = "facebook") {
    //   this.fb.login(['public_profile', 'user_friends', 'email'])
    //     .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    //     .catch(e => console.log('Error logging into Facebook', e));

    // }
  }

  gotoRegister() {
    this.navCtrl.push(RegistroPage);
  }

  LogInEvent() {
    if (this.isValidForm()) {
      console.log("Hacer llamado al metodo para loguearse");
      if (true) {
        this.navCtrl.push(CatalogoEmpresasPage);
      }
    } else {
      return false;
    }
  }

  isValidForm(): Boolean {
    var isValid = true;
    $("#InicioForm input").each(function () {
      var elem = $(this);
      if (elem.val() == "") {
        console.log("Algunos input están vacíos!");
        isValid = false;
      }
    });
    return isValid;
  }
}
