import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as $ from "jquery";
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
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
  username:string="";
  nombre:string="";
  email:string="";
  contra:string="";
  confirmcontra:string="";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl:AlertController,
    private http : HttpserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  gotoHome() {
    this.navCtrl.pop();
  }


  validForm(): Boolean {
    
    let isValid = true;
    $("#RegisterForm form input").each(function () {
      var element = $(this);
      console.log(element.val());
      if (!element.val()) {
        isValid = false;
      }
    });
    if(this.contra != this.confirmcontra){
      isValid=false;
      let alert = this.alertCtrl.create({
        title:"Error",
        subTitle:"Las contraseñas no coinciden!",
        buttons:["Ok"]
      });
      alert.present();
    }else{
      if (!isValid){
        let alert = this.alertCtrl.create({
          title:"Error",
          subTitle:"Complete todos los campos",
          buttons:["Ok"]
        });
        alert.present();
      }
    }
    return isValid;
  }

  registerEvent() {
    if (this.validForm()) {
      console.log("Formulario valido.");
      let usuario :any = {
        username:this.username,
        contra:this.contra,
        nombre:this.nombre,
        email:this.email
      };
      if (this.http.register(usuario)){
        this.navCtrl.push(CatalogoEmpresasPage,this.username);
      }else{
        let alert = this.alertCtrl.create({
          title:"Error",
          subTitle:"No se pudo realizar el registro.",
          buttons:["Ok"]
        });
        alert.present();
      }

    } else {
      console.log("Formulario invalido.");
    }
  }
}
