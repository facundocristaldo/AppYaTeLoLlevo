import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
import * as $ from "jquery";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
