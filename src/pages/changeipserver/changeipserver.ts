import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

/**
 * Generated class for the ChangeipserverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changeipserver',
  templateUrl: 'changeipserver.html',
})
export class ChangeipserverPage {

  nuevaIp: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpserviceProvider, private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeipserverPage');
  }

  cambiarip(){
    if (this.http.changeServerIp(this.nuevaIp)){
      let alert = this.alertCtrl.create({
        title: "Exito",
        message: 'Se cambió la ip',
        buttons: ["Ok"]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: "Error",
        message: 'Algo salió mal',
        buttons: ["Ok"]
      });
      alert.present();
    }
  }
}
