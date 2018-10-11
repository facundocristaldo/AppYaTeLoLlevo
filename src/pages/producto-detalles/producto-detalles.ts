import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../catalogo-productos/catalogo-productos';

/**
 * Generated class for the ProductoDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto-detalles',
  templateUrl: 'producto-detalles.html',
})
export class ProductoDetallesPage {
  prod: Producto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prod = this.navParams.get('producto');
    console.log("dentro de detalles ", this.prod);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoDetallesPage');

  }



}
