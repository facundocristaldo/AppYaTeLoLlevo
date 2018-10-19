import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoDetallesPage } from '../producto-detalles/producto-detalles';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

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
  AllProds: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpserviceProvider) {
    this.empresa = navParams.data;
  }


  

  ionViewDidLoad() {
    console.log('Cargado el catalogo de productos para la empresa con rut ' + this.empresa.rut);
    this.AllProds = this.http.CargarProductos(this.empresa.rut);

  }



  ViewDetails(prod: Producto) {
    console.log(prod);
    this.navCtrl.push(ProductoDetallesPage,  prod );
  }

}
export interface Producto {
  nombre: string;
  descripcion: string;
  emprut: string;
  precio: number;
  moneda: string;
  img: string;
  dimensiones: string;
  id:string

}