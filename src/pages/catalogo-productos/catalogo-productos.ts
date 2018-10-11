import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoDetallesPage } from '../producto-detalles/producto-detalles';

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
  @Input() emprut: string;
  AllProds: Producto[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.emprut = navParams.get("emprut");
    this.tempCargarProductos();
  }


  tempCargarProductos(): void {
    for (var i = 0; i < 30; i++) {
      this.AllProds.push({
        'nombre': 'Producto ' + i,
        'emprut': this.emprut,
        'precio': i,
        'moneda': 'USD',
        'img': 'https://cdn0.iconfinder.com/data/icons/website-kit-2/512/icon_55-512.png',
        'descripcion': 'Esta es una descripcion del producto ' + i * 84 / 3 + '',
        'dimensiones': '400 x 200mm'
      });
    }
  }

  ionViewDidLoad() {
    console.log('Cargado el catalogo de productos para la empresa con rut ' + this.emprut);
  }



  ViewDetails(prod: Producto) {
    console.log(prod);
    this.navCtrl.push(ProductoDetallesPage, { 'producto': prod });
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

}