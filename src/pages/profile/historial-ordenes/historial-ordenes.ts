import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';
import { OrdenDetallesPage } from './orden-detalles/orden-detalles';

/**
 * Generated class for the HistorialOrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial-ordenes',
  templateUrl: 'historial-ordenes.html',
})
export class HistorialOrdenesPage {
  Ordenes :any[]= [];
  ratingClicked: number;
  itemIdRatingClicked: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : HttpserviceProvider,private storage : Storage,private alertCtrl : AlertController) {
    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HistorialOrdenesPage');
    this.CargarHistorial();
  }

  CargarHistorial(){
    this.storage.ready().then(()=>{
      this.storage.get("Email").then(e=>{
        this.http.CargarHistorialOrdenes(e).subscribe(result=>{
          console.log("Resultado de historial ordenes",result.ordenes);
          this.Ordenes = result.ordenes;
        });

      });
    });
  }

  verOrden(orden:any){
    this.navCtrl.push(OrdenDetallesPage,{parm:orden});
  }
  ratingComponentClick(clickObj: any, orden:any): void {
    console.log("Rating " , clickObj);
    this.http.puntuarEmpresa(orden.Rut,orden.Guid,clickObj.rating).subscribe(response=>{
      console.log("Response al puntuar producto",response);
      if (response.status==200){
        this.CargarHistorial();
        let alert = this.alertCtrl.create({
          title:"Éxito",
          subTitle:response.message,
          buttons:["Ok"]
        });
        alert.present();
      }else{
        let alert = this.alertCtrl.create({
          title:"Error",
          subTitle:response.message,
          buttons:["Ok"]
        });
        alert.present();
      }
    });
  }
}
