import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../../pages/catalogo-empresas/catalogo-empresas';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HttpserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpserviceProvider {
  
  
  
  
  
  serverurl : string  = "http://localhost:51532/api/";

  constructor(public http: HttpClient) {
    console.log('Hello HttpserviceProvider Provider');
  }
  //Iniciar Sesion Por Facebook 
  //Inicia sesion contra la base de datos local con el email y el userId de fb del cliente
  loginFacebook(usuario: any): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'/*,
        'Authorization': 'Beaurer '*/
      })
    };
    return this.http.post(this.serverurl+"Client/IniciarSesionPorFacebook",
      {
       "Email":usuario.Email,
       "IdFacebook":usuario.IdFacebook
      },
      httpOptions);
  }
  //Registrar Cliente Por Facebook 
  //Registra el user id y email de facebook en la base de datos de ya te lo llevo
  registerFacebook(usuario: any): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'/*,
        'Authorization': 'Beaurer '*/
      })
    };
    return this.http.post(this.serverurl+"Client/RegistrarCliente",//Client/RegistrarClientePorFacebook",
      {
       "Email":usuario.Email,
       "IdFacebook":usuario.IdFacebook,
       "Foto":usuario.Foto,
       "Nombre":usuario.Nombre
      },
      httpOptions);
  }
  


  whois(usuarioEmail: string): Observable<any> {
    //agregar llamado que retorne los datos del cliente
    return this.http.get(this.serverurl+"Client/VerInfoCliente?email="+usuarioEmail);
  }

  //Obtener todas las empresas
  //Obtiene todas las empresas de la plataforma
  //Proximo a cambiar para el api del cliente
  getEmpresas(barrio:string,index:number) : Observable<any>{
    return this.http.get(this.serverurl+"Client/ObtenerEmpresas?barrio="+barrio+"&index="+index);
  }
  
  getRubro() : Observable<any>{
    return this.http.get(this.serverurl+"Client/ObtenerRubros");
  }



  CargarProductos(emprut:string): any[] {
    var allprods :any = [];
    let img = "";
    
    for (var i = 0; i < 30; i++) {
      if (i%2==0){
        img = "https://cdn0.iconfinder.com/data/icons/website-kit-2/512/icon_55-512.png";
      }else{
        img = "http://www.abudhabi2.com/wp-content/uploads/2017/06/IMG-Worlds-of-Adventure-1-945x776.jpg";
      }
      allprods.push({
        'nombre': 'Producto ' + i,
        'emprut': emprut,
        'precio': i,
        'moneda': (i%3==0)?'USD':'$',
        'img': img,
        'descripcion': 'Esta es una descripcion del producto ' + (i+2) * 84 / 3 + '',
        'dimensiones': (i+1)*28/3+' x '+(i+1)*40/5+'mm'
      });
    }
    return allprods;
  }

  register(usuario:any) : Observable<any>{
    console.log("Envio datos de registro",usuario.Clave,usuario.Nombre,usuario.Email);
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'/*,
        'Authorization': 'Beaurer '*/
      })
    };
    return this.http.post(this.serverurl+"Client/RegistrarCliente",
      {
        'Nombre':usuario.Nombre,
        'Clave':usuario.Clave,
        'Email':usuario.Email
      },httpOptions);
    
  }

  login (usuario:string, contras:string):Observable<any>{
    console.log("Envio datos de logueo",usuario,contras);
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };    
    return this.http.post(this.serverurl+"Client/IniciarSesion",
      {
        'Email':usuario,
        'Clave':contras,
      },httpOptions
    );
  }

  tieneAcceso(usuario:string, rutEmpresa:string):Observable<any>{
    return this.http.get(this.serverurl+"Client/TienePermisoUsuario?rut="+rutEmpresa+"&email="+usuario);
  }

  otorgarAcceso(usuario:string, rutEmpresa:string):Observable<any>{
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/OtorgarPermisoUsuario",{
      "Rut":rutEmpresa,
      "EmailCliente":usuario,
      "Activo":true
    },httpOptions);
  }

  comentar(empRut:string,prodId:string,userName:string,commentContent:string):void{
    
  }

  getComments(emprut : string,prodid:string): any[]{
    console.log("Llamado para obtener los comentarios de un producto");
    var allcomments :any = [];
    for (var i = 0; i < 30; i++) {
      allcomments.push({
        'id': i*7.2/3,
        'emprut': emprut,
        'username': (i*8%7==2)?"facundo":"matias",
        'content': 'Se comenta'+i*5.3/2+' veces el objeto.'
      });
    }
    return allcomments;
  }


  BuscarEmpresas(partnombre) : Observable<any>{
    return  this.http.get(this.serverurl+"Client/BuscarEmpresas?partnombre="+partnombre);
  }

  
}
