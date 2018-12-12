import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../../providers/httpservice/httpservice';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalItem } from '@ionic-native/paypal';
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
    private payPal: PayPal,
    private http : HttpserviceProvider,
    private alertCtrl:AlertController
    
    ) {
    this.Carrito = this.navParams.data.Carrito;
    let totalPrice :number = 0;
    this.Carrito.Productos.forEach(element => {
      var num=Number (element.Precio);
      var cant = Number(element.Cantidad);
      totalPrice = totalPrice + (num*cant);
    });
    this.Carrito["PrecioTotal"] = totalPrice;
    console.log("Carrito recibido en el pagarCarritoPAage: ",this.Carrito);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoCarritoPage');
  }


  Pagar(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'ATO-HaubGjfhdI_TKQiVMjOElb8FAwdJtS-xFSLce7k2AKg7Gx0hKWlz8KVlIlLITGHXGsVjTpl4EbpB'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          //let paypalitems = [];
          //paypalitems.push(new PayPalItem("name",1,"69","USD"));
          let payment = new PayPalPayment(this.Carrito.PrecioTotal, 'USD', 'Compra realizada a empresa'+this.Carrito.Rut, 'sale');
          //payment.items =paypalitems;
          
          
          this.payPal.renderSinglePaymentUI(payment).then((paypalresponse) => {
          // Successfully paid
          console.log("PayPal Returns",paypalresponse.response);
          this.Carrito["TransaccionPaypal"]=paypalresponse.response.id;
          this.Carrito["TransaccionPaypal"]="testing";
          this.http.pagaCarrito(this.Carrito).subscribe(ret=>{
            console.log("Restorno al pagar compra ",ret);
            if (ret.status==200){
              let alert = this.alertCtrl.create({
                title:"Éxitos",
                subTitle:"Se ha realizado la compra",
                buttons:["Ok"]
              });
              alert.present();
            }else{
              let alert = this.alertCtrl.create({
                title:"Error",
                subTitle:"Algo salió mal procesando la orden",
                buttons:["Ok"]
              });
              alert.present();

            }
          });

        }, (error) => {
          // Error or render dialog closed without being successful
          let alert = this.alertCtrl.create({
            title:"Error",
            subTitle:"Se canceló el pago.",
            buttons:["Ok"]
          });
          alert.present();
          //deberia cancelar el pago en paypal
        });
      }, () => {
        console.log("Error en configuracion!.");
        // Error in configuration
      });
   }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log("No se pudo iniciar la transaccion con paypal");
    });
    
  }

}

// Example sandbox response
//
// {
//   "client": {
//     "environment": "sandbox",
//     "product_name": "PayPal iOS SDK",
//     "paypal_sdk_version": "2.16.0",
//     "platform": "iOS"
//   },
//   "response_type": "payment",
//   "response": {
//     "id": "PAY-1AB23456CD789012EF34GHIJ",
//     "state": "approved",
//     "create_time": "2016-10-03T13:33:33Z",
//     "intent": "sale"
//   }
// }