import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../catalogo-productos';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-producto-detalles',
  templateUrl: 'producto-detalles.html',
})
export class ProductoDetallesPage {
  prod: Producto;
  comments : any =[]
  Email : string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpserviceProvider,
    private storage : Storage
    ) {
      this.prod = this.navParams.data;
      this.storage.ready().then(()=>{
        this.storage.get("Email").then(e=>this.Email=e);

      });
     }

  ionViewDidLoad() {
    
    this.comments = this.http.getComments(this.prod.Rut,this.prod.ObjectId);
    
  }
  agregarAlCarrito(){
    this.http.agregarProdAlCarrito(this.prod,this.Email).subscribe(response=>{
      console.log(response);
    });
  }


}
