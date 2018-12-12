import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PermisosUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permisos-usuario',
  templateUrl: 'permisos-usuario.html',
})
export class PermisosUsuarioPage {

  permisos:any[] = [];
  userData : any={
    Email:"",
    Nombre:""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http : HttpserviceProvider, 
    private storage:Storage,
    private loadingController: LoadingController,
    private alertCtl:AlertController
    ) {
      
    }

  ionViewDidLoad() {
    this.storage.ready().then(()=>{
      this.storage.get("Email").then(e=>{console.log("Email en storage "+e);this.userData.Email=e;this.cargarPermisos(1);});
      this.storage.get("Nombre").then(e=>{console.log("Nombre en storage "+e);this.userData.Nombre=e;});
    });
    
  }

  cargarPermisos(pageNum:number){
    let loader = this.loadingController.create({content:"Iniciando Sesion..."});
    loader.present();
    this.http.ListarPermisos(this.userData.Email,pageNum).subscribe(response=>{
      console.log("Respuesta del servidor sobre permisos",response);
      if(response.permisos!=null){
        this.permisos=[];
        response.permisos.forEach(element => {
          this.permisos.push(element);
        });
      }
      loader.dismiss();
    });
  
  }

  EliminarPermiso(Rut:string){
    this.http.EliminarPermiso(Rut,this.userData.Email).subscribe(response=>{
      console.log("Respuesta del servidor",response);
      if (response.status=200){
        let alert = this.alertCtl.create({
          title: "Éxito",
          message: 'Los datos se actualizaron correctamente.',
          buttons: ["Ok"]
        });
        alert.present();
        this.cargarPermisos(1);
      }else{
        let alert = this.alertCtl.create({
          title: "Error",
          message: 'Algo salió mal.',
          buttons: ["Ok"]
        });
        alert.present();
      }
    });
  }

}
