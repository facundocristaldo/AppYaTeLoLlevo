import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CatalogoProductosPage } from '../catalogo-productos/catalogo-productos';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ProfilePage } from '../profile/profile';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, private http : HttpserviceProvider) {
    this.username = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('Se carga la pagina de catalogo de empresas');
    this.AllEmps = this.http.getEmpresas();
  }

 
  goprofile(){
    this.navCtrl.push(ProfilePage);
  }


  gotoCatalogoProductos($event) {
    let valid : Boolean = this.http.tieneAcceso(this.username,$event.rut);
    if(valid){
      console.log($event);
      this.navCtrl.push(CatalogoProductosPage, $event );
    }else{
      
      let alert = this.alertCtrl.create({
        title: this.username+":",
        message: 'La empresa '+$event.rut+' tendrá acceso a sus datos.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              valid= false;
            }
          },
          {
            text: 'Aceptar',
            handler: () => {

              this.http.otorgarAcceso(this.username,$event.rut);
              
              this.navCtrl.push(CatalogoProductosPage, $event.rut);
            }
          }
        ]
      });
      alert.present();
    }
  }
  

}



export interface Empresa {
  nombre: string;
  rut: string;
  direccion: string;
  url: string;
  img: string;

}