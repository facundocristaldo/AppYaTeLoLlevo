import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../../providers/httpservice/httpservice';

/**
 * Generated class for the OrdenDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orden-detalles',
  templateUrl: 'orden-detalles.html',
})
export class OrdenDetallesPage {
  @Input() orden : any = {};
  ratingClicked: number;
  itemIdRatingClicked: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpserviceProvider,private alertCtrl : AlertController) {
    
  }

  ionViewWillEnter() {
    this.orden = this.navParams.data.parm;
    console.log("orden->",this.orden);
  }
  ratingComponentClick(clickObj: any): void {
    clickObj["Rut"]=this.orden.Rut;
    clickObj["Email"]=this.orden.EmailCliente;
    clickObj["GuidOrden"]=this.orden.Guid;
    console.log("Rating " , clickObj);
    this.http.puntuarProducto(clickObj.Rut,clickObj.Email,clickObj.GuidOrden,clickObj.itemId,clickObj.rating).subscribe(response=>{
      console.log("Response al puntuar producto",response);
      if (response.status==200){
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
    /*const item = this.orden.Productos.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.company;
    }
*/
  }
}
