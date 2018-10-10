import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
        'img': 'IMG' + i + '.JPG'
      });
    }
  }

  ionViewDidLoad() {
    console.log('Cargado el catalogo de productos para la empresa con rut ' + this.emprut);
  }

}


export interface Producto {
  nombre: string;
  emprut: string;
  precio: number;
  moneda: string;
  img: string;

}