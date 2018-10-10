import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatalogoProductosPage } from '../catalogo-productos/catalogo-productos';

/**
 * Generated class for the CatalogoEmpresasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo-empresas',
  templateUrl: 'catalogo-empresas.html',
})
export class CatalogoEmpresasPage {

  username: string;
  AllEmps: Empresa[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tempCargarEmpresas();
  }

  ionViewDidLoad() {
    console.log('Se carga la pagina de catalogo de empresas');
  }

  tempCargarEmpresas(): void {
    for (var i = 0; i < 30; i++) {
      this.AllEmps.push({
        'nombre': 'EMPRESA ' + i,
        'rut': '0' + i + '5' + i + '0' + i + '8' + i,
        'url': 'WWW.EMPRESA' + i + '.COM',
        'direccion': 'DIRECCION ' + i,
        'img': 'IMG' + i + '.JPG'
      });
    }
  }


  gotoCatalogoProductos(emprut: string) {
    this.navCtrl.push(CatalogoProductosPage, { 'emprut': emprut });
  }
}


export interface Empresa {
  nombre: string;
  rut: string;
  direccion: string;
  url: string;
  img: string;

}