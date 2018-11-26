import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpserviceProvider } from '../../../../providers/httpservice/httpservice';

/**
 * Generated class for the PagoCarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago-carrito',
  templateUrl: 'pago-carrito.html',
})
export class PagoCarritoPage {

  Carrito : any ;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http : HttpserviceProvider,
    
    ) {
    this.Carrito = this.navParams.data.Carrito;
    let totalPrice = 0;
    this.Carrito.Productos.forEach(element => {
      totalPrice = totalPrice + element.Precio;
    });
    this.Carrito["PrecioTotal"] = totalPrice;
    console.log("Carrito recibido en el pagarCarritoPAage: ",this.Carrito);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoCarritoPage');
  }


  Pagar(){
    this.http.pagaCarrito(this.Carrito).subscribe();
  }

}
