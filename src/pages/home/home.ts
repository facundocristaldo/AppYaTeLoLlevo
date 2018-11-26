import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { CatalogoEmpresasPage } from '../catalogo-empresas/catalogo-empresas';
import * as $ from "jquery";
 import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { Storage } from '@ionic/storage';
import { ChangeipserverPage } from '../changeipserver/changeipserver';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: any;
  userEmail : string = "";
  contras : string = "";
  userId : string = "";

  constructor(
    public navCtrl: NavController, 
    private fb: Facebook,
    public alertCtrl: AlertController,
    private http:HttpserviceProvider,
    private storage : Storage,
    private loadingController: LoadingController
    ) {
      
  }

  presentAlert( titulo:string, subtitulo:string, mensaje:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [mensaje]
    });
    alert.present();
  }
  /*social sign in viejo
  socialSignIn(socialMedia: string) {
    let loader = this.loadingController.create({content:"Iniciando Sesion..."});
    loader.present();
    console.log("Clickeado inicio de sesion con red social: " + socialMedia);
    if (socialMedia == 'facebook') {
      //Llama a la api de fb para loguearse
      this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        //obtiene los datos del usuario
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          
          this.userData = {
            Email: profile['email'], 
            Nombre: profile['first_name'], 
            Foto: profile['picture_large']['data']['url'], 
            IdFacebook: profile['id']
          }
          console.log("datos del usuario retornados de facebook",this.userData);
          //llama al api local para loguearse con idFacebook y email
          this.http.loginFacebook(this.userData).subscribe(
            ret=>{
              console.log("login fb db Alert ",this.userData);
              console.log("header de retorno login ",ret.headers.get("status"));
              if (ret.status==200){
                console.log("login fb db Alert ret ",ret);
                //Obtiene los datos del usuario, dado su email
                this.http.whois(this.userData.Email).subscribe(
                  profile=>{
                    console.log("Login FB Profile=> ",profile);
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
                      
                     loader.dismiss();
                      //reenvia al catalogo de empresas
                      this.navCtrl.push(CatalogoEmpresasPage,this.userData); 
                    }   
                  }
                   );
              }else if(ret.status==404){
                //this.presentAlert("alert",this.userData,"OK");
                //this.navCtrl.push(CatalogoEmpresasPage,this.userData);
                console.log("Usuario no loguea en bd local",this.userData);
                this.http.registerFacebook(this.userData).subscribe(
                  ret=>{
                    console.log("Registro por fb ret => ",ret.headers.get("status"));
                    if(ret.status==200){
                      //guardar token de retorno en la storage
                      //Obtiene los datos del usuario, dado su email
                      console.log("REgistro status 200 ret")
                      this.http.whois(this.userData.Email).subscribe(
                        profile=>{
                          console.log("Profile=> ",profile);
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
                           loader.dismiss();
                            //reenvia al catalogo de empresas
                            this.navCtrl.push(CatalogoEmpresasPage,this.userData); 
                          }   
                        }
                         );
                    }else{
                      this.presentAlert("Error","Algo salió mal...","Ok");
                    }
                  }
                );
              }
            }
          );
        }
        )
      })
      .catch(e => {
        this.presentAlert("Error",'Error al loguearse en Facebook' , "ok");
        loader.dismiss();
      });

    }
  }

  */
  socialSignIn(socialMedia: string) {
    let loader = this.loadingController.create({content:"Iniciando Sesion..."});
    loader.present();
    console.log("Clickeado inicio de sesion con red social: " + socialMedia);
    if (socialMedia == 'facebook') {
      //Llama a la api de fb para loguearse
      this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        //obtiene los datos del usuario
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          
          this.userData = {
            Email: profile['email'], 
            Nombre: profile['first_name'], 
            Foto: profile['picture_large']['data']['url'], 
            IdFacebook: profile['id']
          }
          console.log("datos del usuario retornados de facebook",this.userData);
          //llama al api local para loguearse con idFacebook y email
          this.http.loginFacebook(this.userData).subscribe(
            ret=>{
              if (ret.status==200){
                //Obtiene los datos del usuario, dado su email
                this.http.whois(this.userData.Email).subscribe(
                profile=>{
                  console.log("Profile=> ",profile);
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
                    loader.dismiss();
                    //reenvia al catalogo de empresas
                    this.navCtrl.push(CatalogoEmpresasPage,this.userData); 
                  }   
                }
                 );
              } else{
                loader.dismiss();
                this.presentAlert("Error","No se ha podido iniciar sesion","ok");
              } 
          });
        });
      });   
    }
  }

  gotoIpchange(){
    this.navCtrl.push(ChangeipserverPage);
  }

  gotoRegister() {
    this.navCtrl.push(RegistroPage);
  }

  LogInEvent() {
    if (this.isValidForm()) {
      let loader = this.loadingController.create({content:"Iniciando Sesion..."});
    loader.present();
      //Se valida que el usuario y la contraseña esten bien llamando al rest
      this.http.login(this.userEmail,this.contras).subscribe(
        ret => {
          console.log("login return ",ret);
          //Estado 200 implica que valida las credenciales
          if (ret.status==200){
            //Obtiene los datos del usuario, dado su email
            this.http.whois(this.userEmail).subscribe(
            profile=>{
              console.log("Profile=> ",profile);
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
                loader.dismiss();
                //reenvia al catalogo de empresas
                this.navCtrl.push(CatalogoEmpresasPage,this.userData); 
              }   
            }
             );
          } else{
            loader.dismiss();
            this.presentAlert("Error","No se ha podido iniciar sesion","ok");
          }   
        }
      );
    } else {
      return false;
    }
  }

  isValidForm(): Boolean {
    var isValid = true;
    $("#UserPswForm input").each(function () {
      var elem = $(this);
      if (elem.val() == "") {
        
        isValid = false;
      }
    });
    if (!isValid){
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Algunos campos están vacíos!",
        buttons: ["Ok"]
      });
      alert.present();
    }
    return isValid;
  }
}
