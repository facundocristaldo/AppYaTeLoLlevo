import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ProductoDetallesPage } from './producto-detalles/producto-detalles';
import { CarritoComprasPage } from './carrito-compras/carrito-compras';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CatalogoProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo-productos',
  templateUrl: 'catalogo-productos.html',
})
export class CatalogoProductosPage {
  empresa: any = {};
  AllProds: Producto[] = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private http:HttpserviceProvider,
    private storage: Storage
    ) {
    this.empresa = navParams.data;
  }


  

  ionViewDidLoad() {
    console.log('Cargado el catalogo de productos para la empresa con rut ' + this.empresa.Rut);
    this.http.CargarProductos(this.empresa.Rut).subscribe(response=>{
      if(response!=null){
        response.productos.forEach(element => {
          this.AllProds.push({
            Nombre : element.PropProducto.Nombre,
            Imagenes : element.Imagenes,
            Rut: this.empresa.Rut,
            ObjectId: element.ObjectId,
            Moneda:"$",
            Precio:element.PropProducto.Precio,
            Volumen:element.PropProducto.Volumen,
            Descripcion:element.PropProducto.Descripcion

          });
        });
      }
    });

  }



  ViewDetails(prod: Producto) {
    console.log(prod);
    this.navCtrl.push(ProductoDetallesPage,  prod );
  }


  gotoCarrito(){
    let Carrito  = {
      Email : "", 
      Rut : ""
    };
    this.storage.ready().then(() => {
      this.storage.get('Email').then(a=>{console.log(a);Carrito.Email=a;}).then(()=>{
        Carrito.Rut = this.empresa.Rut;
        this.navCtrl.push(CarritoComprasPage,Carrito);
      });
    });
  }
}
export interface Producto {
  Nombre: string;
  Imagenes: string[];
  Rut:string;
  ObjectId:string;
  Moneda:string;
  Precio:string;  
  Volumen:string;
  Descripcion:string;
}