import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../catalogo-productos/catalogo-productos';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { Empresa } from '../catalogo-empresas/catalogo-empresas';

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
  comments : any =[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpserviceProvider
    ) {
      this.prod = this.navParams.data;
     }

  ionViewDidLoad() {
    
    this.comments = this.http.getComments(this.prod.emprut,this.prod.id);
    
  }



}
