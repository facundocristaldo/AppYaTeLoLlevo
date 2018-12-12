import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ProductoDetallesPage } from './producto-detalles/producto-detalles';
import { CarritoComprasPage } from './carrito-compras/carrito-compras';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
/**
 * Generated class for the CatalogoProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo-productos',
  templateUrl: 'catalogo-productos.html'
})
export class CatalogoProductosPage {
  empresa: any = {};
  AllProds: Producto[] = [];
  Categorias: any[]=[];
  showCategoriasList:Boolean=false;
  searchContent:string="";
  BuscoProds:Producto[]=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private http:HttpserviceProvider,
    private storage: Storage
    ) {
    this.empresa = navParams.data;
  }

  BuscarProducto(){
    this.http.BuscarProducto(this.empresa.Rut, this.searchContent).subscribe(result=>{
      if (result==200){
        this.BuscoProds=[]
        result.productos.forEach(element => {
          this.BuscoProds.push(element);
        });
      }
    });
    console.log(this.BuscoProds);
  }
  

  ionViewDidLoad() {
    console.log('Cargado el catalogo de productos para la empresa con rut ' + this.empresa.Rut);
    this.CargarProductos(this.empresa.Rut,"none");
    this.GetCategorias();

  }
  GetCategorias(index : number=1){
    this.http.GetCategorias(this.empresa.Rut,index).subscribe(response =>{
      if ( response.status==200){
          this.Categorias=[];
          response.categorias.forEach(element => {
            this.Categorias.push(element);
          });
      }
    });
  }
  doRefresh(refresher) {
    this.storage.ready().then(()=>{
      this.storage.get("DirCliente").then(e=>{
        this.CargarProductos(this.empresa.Rut,"none");
        this.GetCategorias();
        refresher.complete();
      });
    });
  }

  CargarProductos(emprut:string, GuidCategoria:string,index:number=1){
    this.http.CargarProductos(emprut,index,GuidCategoria).subscribe(response=>{
      if(response!=null){
        this.AllProds =[];
        response.productos.forEach(element => {
          this.AllProds.push({
            Nombre : element.PropProducto.Nombre,
            Imagenes : element.Imagenes,
            Rut: this.empresa.Rut,
            ObjectId: element.ObjectId,
            Moneda:"USD",
            Precio:element.PropProducto.Precio,
            Volumen:element.PropProducto.Volumen,
            Descripcion:element.PropProducto.Descripcion,
            Puntos:element.PropProducto.Puntos,
            Peso:element.PropProducto.Peso

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
  
  toggleShow(){
    if(this.showCategoriasList){
      this.showCategoriasList=false;
      $("#CategoriasList").addClass("hiddenCategoriasList")
      $("#CategoriasList").removeClass("showCategoriasList");
    }else{
      this.showCategoriasList=true;
      $("#CategoriasList").addClass("showCategoriasList")
      $("#CategoriasList").removeClass("hiddenCategoriasList");
    }
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
  Puntos:string;
  Peso:string;
}