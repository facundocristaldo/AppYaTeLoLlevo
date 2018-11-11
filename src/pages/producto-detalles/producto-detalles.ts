import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../catalogo-productos/catalogo-productos';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';


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
