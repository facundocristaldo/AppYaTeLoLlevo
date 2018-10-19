import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../../pages/catalogo-empresas/catalogo-empresas';

/*
  Generated class for the HttpserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpserviceProvider Provider');
  }

  getEmpresas() : Empresa[]{
    var unemp : any = [];

      for (var i = 0; i < 30; i++) {
        unemp.push({
          'nombre': 'EMPRESA ' + i,
          'rut': '0' + i + '5' + i + '0' + i + '8' + i,
          'url': 'WWW.'+i+'EMPRESA' + i + '.COM',
          'direccion': 'DIRECCION ' + i,
          'img': 'IMG' + i + '.JPG'
        });
      }
    return unemp;
  }


  CargarProductos(emprut:string): any[] {
    var allprods :any = [];
    for (var i = 0; i < 30; i++) {
      allprods.push({
        'nombre': 'Producto ' + i,
        'emprut': emprut,
        'precio': i,
        'moneda': (i%3==0)?'USD':'$',
        'img': 'https://cdn0.iconfinder.com/data/icons/website-kit-2/512/icon_55-512.png',
        'descripcion': 'Esta es una descripcion del producto ' + (i+2) * 84 / 3 + '',
        'dimensiones': (i+1)*28/3+' x '+(i+1)*40/5+'mm'
      });
    }
    return allprods;
  }

  register(usuario:any) : boolean{
    console.log("Envio datos de registro",usuario.username,usuario.contra,usuario.nombre,usuario.email);
    return true;
  }

  login (usuario:string, contras:string, redsocial:Boolean, userId:string):boolean{
    console.log("Envio datos de logueo",usuario,contras,redsocial,userId);
    return true;
  }

  tieneAcceso(usuario:string, rutEmpresa:string):boolean{
    return true;
  }

  otorgarAcceso(usuario:string, rutEmpresa:string):boolean{
    return true;
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
}
