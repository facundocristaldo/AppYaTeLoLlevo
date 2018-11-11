import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as $ from "jquery";
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  username:string="";
  nombre:string="";
  email:string="";
  contra:string="";
  confirmcontra:string="";
  userData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl:AlertController,
    private http : HttpserviceProvider,
    private storage : Storage,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  gotoHome() {
    this.navCtrl.pop();
  }


  validForm(): Boolean {
    
    let isValid = true;
    $("#RegisterForm form input").each(function () {
      var element = $(this);
      console.log(element.val());
      if (!element.val()) {
        isValid = false;
      }
    });
    if (!this.validacionEmail(this.email)){
      isValid=false;
    }
    if(this.contra != this.confirmcontra){
      isValid=false;
      let alert = this.alertCtrl.create({
        title:"Error",
        subTitle:"Las contraseñas no coinciden!",
        buttons:["Ok"]
      });
      alert.present();
    }else{
      if (!isValid){
        let alert = this.alertCtrl.create({
          title:"Error",
          subTitle:"Complete todos los campos",
          buttons:["Ok"]
        });
        alert.present();
      }
    }
    return isValid;
  }
  validEmail(): boolean{
    if (!this.email.includes("@")){
      return false;
    }else{
      console.log(this.email.includes("@",this.email.length));
       if(this.email.includes("@",this.email.length)){
         return false;
       }
    }
    return true;
  }

  validacionEmail(email){
    var valid = true;
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var correctSyntaxEmail = regex.test(email);
    if ((email == "") || (!correctSyntaxEmail)){
        valid = false;
        // addAclass('fEmail','error-val');
        // if(email == ""){
        //     displayMsg('errorEmail' , 'Ingrese un email no vacio');
        // } else {
        //     displayMsg('errorEmail' , 'Ingrese un email correcto');
        // }
    }
    return valid;
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }  
  //Evento de registro de un usuario 
  registerEvent() {
    //Valida que el formulario sea valido
    if (this.validForm()) {
      console.log("Formulario valido.");
      let usuario :any = {
        Clave:this.contra,
        Nombre:this.nombre,
        Email:this.email
      };
      this.presentLoadingDefault();    
      //llama al rest de registro
      this.http.register(usuario).subscribe(
        ret=>{
          console.log("register return",ret);
          if (ret.status==200){
            console.log("se registró");
            //guardar token de retorno en la storage
            //Obtiene los datos del usuario, dado su email
            this.http.whois(this.email).subscribe(
              profile=>{
                if(profile!=null){
                  //obtiene los datos del retorno del api
                  this.userData = {
                    Email: profile.cliente.Email, 
                    Nombre: profile.cliente.Nombre, 
                    Foto: profile.cliente.Foto, 
                  }
                 //guarda los datos en el storage
                 this.storage.set("Email",this.userData.Email);
                 this.storage.set("Nombre",this.userData.Nombre);
                 this.storage.set("Foto",this.userData.Foto);
                  //reenvia al catalogo de empresas
                  this.navCtrl.push(CatalogoEmpresasPage,this.username);
               }   
             }
            );
          }else if (ret.status==201){
            console.log("Registró al usuario satisfactoriamente. verifique en email");
            this.NotifyAlert("Validacion",ret.message);
          }else{
            console.log("NO registró");
            this.NotifyAlert("Usuario no existe",ret.message);
          }    
        }
      );
    } else {
      console.log("Formulario invalido.");
    }
  }
  notifyUsuarioExiste(){
    let alert = this.alertCtrl.create({
      title:"Error",
      subTitle:"El usuario ya existe.",
      buttons:["Ok"]
    });
    alert.present();
  }
  NotifyAlert(title:string, content:string){
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:content,
      buttons:["Ok"]
    });
    alert.present();
  }
}
