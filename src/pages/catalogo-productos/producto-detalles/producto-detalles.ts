import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Producto } from '../catalogo-productos';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ThrowStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-producto-detalles',
  templateUrl: 'producto-detalles.html',
})
export class ProductoDetallesPage {
  prod: Producto;
  comments : any =[]
  Email : string;
  nuevoComentario: string="";
  Direccion : string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpserviceProvider,
    private storage : Storage,
    private alertCtrl:AlertController,
    private actionSheetCtrl: ActionSheetController
    ) {
      this.prod = this.navParams.data;
      this.storage.ready().then(()=>{
        this.storage.get("Email").then(e=>this.Email=e);
        this.storage.get("Direccion").then(e=>this.Direccion=e.Direccion);
      });
     }

  ionViewDidLoad() {
    this.getComments();
  }

  getComments(){
    this.http.getComments(this.prod.Rut,this.prod.ObjectId).subscribe(response=>{
      if (response.status==200){
        this.comments =[];
        response.comentarios.forEach(element => {
          this.comments.push(element);
        });
      }
    });
  }

  agregarAlCarrito(){
    this.http.agregarProdAlCarrito(this.prod,this.Email).subscribe(response=>{
      console.log(response);
      if (response.status==200){
        let alert = this.alertCtrl.create({
          title:"Éxito",
          subTitle:"Se ha agregado el producto al carrito.",
          buttons:["Ok"]
        });
        alert.present();
        // this.alertShow("Éxitos","Se ha agregado el producto al carrito.","Ok");
      }
    });
  }

  ComentarProd(){
    let alert = this.alertCtrl.create({
      buttons:["Ok"],
      subTitle:"No se pudo realizar el comentario",
      title:"Error"
    });
    if (this.nuevoComentario==""){
      console.log(this.nuevoComentario);
      
      alert.present();
    }else{
      this.http.comentar(this.prod.Rut,this.prod.ObjectId,this.Email,this.nuevoComentario).subscribe(response=>{
        if (response.status==201){
          $("#commentContent").val("");
          this.getComments();
        }else{
          console.log("No se comentó, agregar alert");

          alert.present();
        }
      });
    }
  }
  doRefresh(refresher) {
    this.getComments();
    refresher.complete();
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Canje',
      buttons: [
        {
          text: 'Canjear por puntos',
          handler: () => {
            console.log('Canjear por puntos');
            this.http.ComprarProductoPorPuntos(this.Email, this.prod.Rut,this.prod.ObjectId,this.Direccion).subscribe(response=>{
              console.log("respuesta al comprar por puntos: ",response);
              if (response.status==200){
                this.alertShow("Éxitos","Se ha canjeado el articulo","Ok");
              }else{
                this.http.VerPromoPuntosCliente(this.Email,this.prod.Rut).subscribe(response=>{
                  let promopuntos :string ="0";
                  if ( response.message!=null){
                    promopuntos=response.message;
                  }
                  this.alertShow("Error","Cantidad de puntos insuficientes "+promopuntos,"Ok");
                });
              }
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  alertShow(title:string,subtitle:string,button:string){
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:subtitle,
      buttons:[button]
    });
    alert.present();
  }
}
