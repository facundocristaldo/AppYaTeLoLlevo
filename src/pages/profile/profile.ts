import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData:any;
  base64Image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpserviceProvider, private storage:Storage, private alertCtrl : AlertController,private imagePicker: ImagePicker) {
    this.userData = this.storage.get("userData");
    this.storage.ready().then(() => {
      this.storage.get('Email').then(a=>{console.log(a);this.userData.Email=a;});
      this.storage.get('Nombre').then(a=>{console.log(a);this.userData.Nombre=a;});
      this.storage.get('Foto').then(a=>{console.log(a);this.userData.Foto=a;});
    });
    console.log("userdata ",this.userData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    
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
   let options = {
    maximumImagesCount: 1,
    width: 300,
    height: 300,
    quality : 75
  };

  this.imagePicker.getPictures(options)
    .then((results) => {
        this.base64Image = "data:image/jpeg;base64," + results[0];
        console.log("base 64 image" + this.base64Image);
    }, (error) => {
        console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  
  
}
