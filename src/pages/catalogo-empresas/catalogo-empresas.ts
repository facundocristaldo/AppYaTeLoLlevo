import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CatalogoProductosPage } from '../catalogo-productos/catalogo-productos';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ProfilePage } from '../profile/profile';
import * as $ from "jquery";

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
  AllEmps: any[] = [];
  count:number=0;
  listaBusqueda: any[];
  Email:string;
  Rubros: any[];
  showRubrosList:Boolean=false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController, 
    private http : HttpserviceProvider) 
    {
      this.username = this.navParams.data.Nombre;
      this.Email = this.navParams.data.Email;
    }

  ionViewDidLoad() {
    this.CargarRubros();
    this.count=0;
    console.log('Se carga la pagina de catalogo de empresas');
    this.http.getEmpresas("",this.count).subscribe(res=>{
      console.log("Respuesta del servidor al pedir this.empresasAll",res);
      res.empresa.forEach(element => {
        console.log(element);
        this.count=+1;
        this.AllEmps.push(element);
        
      });
    });
  }
  

 

  
  goprofile(){
    this.navCtrl.push(ProfilePage);
  }


  gotoCatalogoProductos($event) {
    console.log("Usuario " + this.username +" tiene acceso a " + $event.Nombre+"?");
    let valid : String="False"; 
    this.http.tieneAcceso(this.Email,$event.Rut).subscribe(response=>{
      console.log("Respuesta del servidor sobre los permisos del usuario "+this.Email+" para la empresa "+$event.Rut+" es "+response.message);
      valid = response.message;
      if(valid=="True"){
        console.log($event);
        this.navCtrl.push(CatalogoProductosPage, $event );
      }else{
        
        let alert = this.alertCtrl.create({
          title: this.username+":",
          message: 'La empresa '+$event.Nombre+' tendrá acceso a sus datos.',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                valid= "False";
              }
            },
            {
              text: 'Aceptar',
              handler: () => {

                this.http.otorgarAcceso(this.Email,$event.Rut).subscribe(response=>{
                  if (response.message=="True"){
                    this.navCtrl.push(CatalogoProductosPage, $event);
                  }else{
                    let alert = this.alertCtrl.create({
                      title: "Error",
                      message: 'Algo salió mal.',
                      buttons: ["Ok"
                      ]
                    });
                    alert.present();
                  }
                });
                
              }
            }
          ]
        });
        alert.present();
      }
    });
  }
  
  BuscarEmpresas(){
    let partnombre = $("#searchTextEmp").val();
    console.log("Buscando empresas que contengan ",partnombre);
    if (partnombre.trim()!=""){
      this.http.BuscarEmpresas(partnombre).subscribe(ret=>{
        if(ret.empresa!=null && ret.empresa!=[]){
          if (ret.empresa.length==0){
            $("#searchResultEmp").removeClass("searchResultShow");
            $("#searchResultEmp").addClass("searchResultHidden");
          }else{
            $("#searchResultEmp").removeClass("searchResultHidden");
            $("#searchResultEmp").addClass("searchResultShow");
          }
          this.listaBusqueda = [];
          ret.empresa.forEach(element => {
            this.listaBusqueda.push({
              Nombre:element.Nombre,
              Rut: element.Rut
            })
          });
        }else{
          $("#searchResultEmp").removeClass("searchResultShow");        
          $("#searchResultEmp").addClass("searchResultHidden");
        }
        console.log(ret);
      
      });
    }else{
      this.listaBusqueda=[];
      $("#searchResultEmp").removeClass("searchResultShow");        
      $("#searchResultEmp").addClass("searchResultHidden");
    }
  }


  CargarRubros(){
    this.http.getRubro().subscribe(response=>{
      if(response.rubros!=null && response.rubros!=[]){
        this.Rubros=[];
        console.log("Respuesta al obtener rubros");
        response.rubros.forEach(element => {
          this.Rubros.push(element);
        });
      }
    });
  }

  FiltrarRubro(rubro:string){
    console.log("procedimiento para filtrar empresas por rubro ",rubro);
  }

  toggleShow(){
    if(this.showRubrosList){
      this.showRubrosList=false;
      $("#RubrosList").addClass("hiddenRubrosList")
      $("#RubrosList").removeClass("showRubrosList");
    }else{
      this.showRubrosList=true;
      $("#RubrosList").addClass("showRubrosList")
      $("#RubrosList").removeClass("hiddenRubrosList");
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