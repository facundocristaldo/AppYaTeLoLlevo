import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { PropertyBindingType } from '@angular/compiler';
import { PagoCarritoPage } from './pago-carrito/pago-carrito';

/**
 * Generated class for the CarritoComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito-compras',
  templateUrl: 'carrito-compras.html',
})
export class CarritoComprasPage {
  Productos :any = [];
  Email : string;
  Rut :string;
  isEmpty:boolean=true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage : Storage,
    private http :HttpserviceProvider
    ) {
  }

  ionViewDidLoad() {
    this.CargarCarrito();
  }
  CargarCarrito(){
    console.log('ionViewDidLoad CarritoComprasPage');
    this.Rut = this.navParams.data.Rut;
    this.Email = this.navParams.data.Email;
    // this.storage.ready().then(()=>{
    //   this.storage.get("Email").then(e=>{this.Email=e;
        this.http.getCarrito(this.Email,this.Rut).subscribe(response=>{
          console.log(response);
          try{
            let auxProd ={};
          let carrito : any = response.carrito;
          let allProds :any [] = carrito.Productos;
            this.Productos=[];
          allProds.forEach(element => {
          this.isEmpty=false;
            let prod : any = element;
            let auxProd ={
              ObjectId: prod.ObjectId,
              Nombre: prod.PropProducto.Nombre,
              Cantidad: prod.Cantidad,
              Descripcion: prod.PropProducto.Descripcion,
              Peso:prod.PropProducto.Peso,
              Volumen:prod.PropProducto.Volumen,
              Precio:prod.PropProducto.Precio
//              Imagenes: prod.PropProducto.Imagenes[0]
            }
            this.Productos.push(auxProd);
          });
//          this.Productos = carrito.Productos;
          console.log(this.Productos);
          }catch (a ){
            console.log(a);
          }
        });
      
    //   });
    // });
  }
  PagarCarrito(){
//    this.http.PagarCarrito()
    let Carrito = {
      Rut: this.Rut,
      Email : this.Email,
      Productos : this.Productos
    }
    this.navCtrl.push(PagoCarritoPage,{Carrito:Carrito});
  }

  QuitarProductodeCarrito(ObjectId:string){
    this.http.quitarProductodeCarrito(this.Email,this.Rut,ObjectId).subscribe(response=>{
      console.log("Respuesta del servidor",response);
      if (response.status==200){
        this.CargarCarrito();
      }
    });
  }
}
