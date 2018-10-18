import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  @Input() username: string;
  AllEmps: Empresa[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
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
        'url': 'WWW.'+i+'EMPRESA' + i + '.COM',
        'direccion': 'DIRECCION ' + i,
        'img': 'IMG' + i + '.JPG'
      });
    }
  }


  gotoCatalogoProductos(emprut: string) {
    console.log("llamar a api para controlar que la empresa ya tenga otorgado el acceso");
    let valid : Boolean = false;
    if(valid){
      this.navCtrl.push(CatalogoProductosPage, { 'emprut': emprut });
    }else{
      
      let alert = this.alertCtrl.create({
        title: this.username+'Otorgar Acceso',
        message: 'Otorga a la empresa acceso a sus datos?',
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

              console.log('Llamar a la api para otorgar acceso a la empresa emprut para el usuario username');
              
              this.navCtrl.push(CatalogoProductosPage, { 'emprut': emprut });
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