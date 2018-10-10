import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  gotoHome() {
    this.navCtrl.pop();
  }


  validForm(): Boolean {
    console.log($("#RegisterForm #UserName").val());


    var isValid = true;
    $("#UserPswForm input").each(function () {
      var element = $(this);
      console.log(element.val());
      if (!element.val()) {
        isValid = false;
      }
    });
    return isValid;
  }
  registerEvent() {
    if (this.validForm()) {
      console.log("valid form");
    } else {
      console.log("invalid form");
    }
  }
}
