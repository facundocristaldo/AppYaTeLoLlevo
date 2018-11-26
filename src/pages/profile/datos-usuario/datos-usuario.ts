import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DatosUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-usuario',
  templateUrl: 'datos-usuario.html',
})
export class DatosUsuarioPage {
  userData:any;
  base64Image:any;


  photo:string[] = [];
  base64Img:string[]=[];
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private http:HttpserviceProvider, 
    private storage:Storage, 
    private alertCtrl : AlertController,
    private imagePicker: ImagePicker
    
    ) {
    this.userData = this.storage.get("userData");
    this.storage.ready().then(() => {
      this.storage.get('Email').then(a=>{console.log(a);this.userData.Email=a;});
      this.storage.get('Nombre').then(a=>{console.log(a);this.userData.Nombre=a;});
      this.storage.get('Foto').then(a=>{console.log(a);this.userData.Foto=a;});
    });
    console.log("userdata ",this.userData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosUsuarioPage');
  }
  presentAlert( titulo:string, subtitulo:string, mensaje:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [mensaje]
    });
    alert.present();
  }

  selectImage(){
   /* let options :any = {
      maximumImagesCount:1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });

    */
   const options = {
    maximumImagesCount: 1,
    quality: 50,
    width: 512,
    height: 512,
    outputType: 1
    }
    
    this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
    this.photo[i] = results[i];
    this.base64Img[i] ="data:image/jpeg;base64," + results[i];
    console.log(this.base64Img);
    console.log(this.photo);
    this.http.actualizarFoto(this.userData.Email, this.photo[i]).subscribe(response=>{
      console.log("Respuesta del servidor al cambiar imagen"+response);
      this.presentAlert("Modificada","Vuelva a iniciar sesion para ver los cambios reflejados","ok");
    });
    }
    }, (err) => {
    console.log("err" + err);
    });
  }
}
