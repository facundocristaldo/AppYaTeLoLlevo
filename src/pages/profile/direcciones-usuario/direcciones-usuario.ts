import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

/**
 * Generated class for the DireccionesUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direcciones-usuario',
  templateUrl: 'direcciones-usuario.html',
})
export class DireccionesUsuarioPage {
  userData:any;
  canDismiss:boolean=false;
  Direcciones :any[] =[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage:Storage, 
    private viewCtrl: ViewController,
    private http:HttpserviceProvider,
    private alertCtrl : AlertController
    ) {
      this.userData = this.storage.get("userData");
      this.storage.ready().then(() => {
        this.storage.get('Email').then(a=>{console.log(a);this.userData.Email=a;
          this.CargarDirecciones(this.userData.Email);
        });
        this.storage.get('Nombre').then(a=>{console.log(a);this.userData.Nombre=a;});
        this.storage.get('Foto').then(a=>{console.log(a);this.userData.Foto=a;});
        // if (!this.navParams.data.candismiss){
        // }
      });
      if (this.navParams.data.candismiss){
        this.canDismiss = this.navParams.data.candismiss;
        $("#map").addClass("CanDismiss");
      }
      console.log("userdata ",this.userData);
  }
  CargarDirecciones(email :string){
    this.http.ListarDireccionesCliente(email).subscribe(response=>{
      this.Direcciones=[];
      response.direcciones.forEach(element => {
        this.Direcciones.push(element);
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DireccionesUsuarioPage');
  }

  BorrarDireccion(GuidDir:string){
    this.http.BorrarDireccion(GuidDir).subscribe(response=>{
      let result : string ="";
      let title : string = "";

      if (response.status==200){
        title = "Éxito";
        result="Se ha eliminado la direccion correctamente.";
        this.CargarDirecciones(this.userData.Email);
      }else{
        title = "Error";
        result = "No se pudo eliminar la direccion.";
      }
      let alert = this.alertCtrl.create({
        title:title,
        subTitle:result,
        buttons:["Ok"]
      });
      alert.present();
    });
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  NuevaDir(){
    console.log("Nueva direccion llamada");
    let canDismiss={
      candismiss:true
    };
    this.navCtrl.push(DireccionesUsuarioPage,canDismiss);
  }
}
