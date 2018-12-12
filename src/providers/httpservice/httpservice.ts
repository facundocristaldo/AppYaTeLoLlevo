import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpserviceProvider {
  
  
  
  serverurl : string  = "http://localhost/api/";
  
  constructor(public http: HttpClient) {
    console.log('Hello HttpserviceProvider Provider');
  }

  
  changeServerIp(ip:string) : boolean{
    this.serverurl = "http://"+ip+"/api/";
    return true;
  }
  
  CargarHistorialOrdenes(email: string): Observable<any> {
    return this.http.get(this.serverurl+"Client/ListarOrdenesDeCliente?email="+email);
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
    console.log("This user data cuando hago login facebook tiene " , usuario);
    return this.http.post(this.serverurl+"Client/IniciarSesionPorFacebook",
      {
        "Email":usuario.Email,
        "IdFacebook":usuario.IdFacebook,
       "Nombre":usuario.Nombre,
       "Foto":usuario.Foto
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
  getEmpresas(rubro:string,index:number, lat : string, lng : string) : Observable<any>{
    // ObtenerEmpresasPorRubro(string idRubro, int pagina)
    return this.http.get(this.serverurl+"Client/ObtenerEmpresasPorRubro?idRubro="+rubro+"&pagina="+index+"&lat="+lat+"&lng="+lng);
  }
  
  getRubro() : Observable<any>{
    return this.http.get(this.serverurl+"Client/ObtenerRubros");
  }
  
  
  actualizarFoto(useremail:string,photo:string){
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'/*,
        'Authorization': 'Beaurer '*/
      })
    };
    return this.http.post(this.serverurl+"Client/ActualizarImagenUsuario",
      {
        "cliEmail":useremail,
        "base64img":photo
      },
      httpOptions);
    }

    CargarProductos(emprut:string, index:number=1,GuidCategoria:string="none"): Observable<any> {
    return this.http.get(this.serverurl+"Client/ListarProductos?rut="+emprut+"&index="+index+"&guidCategoria="+GuidCategoria);
  }

  GetCategorias(emprut:string, index : number=1): Observable<any> {
    return this.http.get(this.serverurl+"Client/ListarCategorias?rut="+emprut+"&index="+index);
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
        'Email':usuario.Email,
        'Telefono':usuario.Telefono
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
  
  comentar(empRut:string,prodId:string,userName:string,commentContent:string):Observable<any>{
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/ComentarProducto",{
      Comentario:commentContent,
      Email:userName,
      ObjectIdProducto:prodId,
      Rut:empRut
    },httpOptions);
  }

  getComments(emprut : string,prodid:string): Observable<any>{
    return  this.http.get(this.serverurl+"Client/VerComentariosProducto?rut="+emprut+"&productId="+prodid);
  }
  
  BuscarProducto(rut:string,partnombre:string):Observable<any>{
    return this.http.get(this.serverurl+"Client/BuscarProductos?rut="+rut+"&partnombre="+partnombre)
  }

  BuscarEmpresas(partnombre) : Observable<any>{
    return  this.http.get(this.serverurl+"Client/BuscarEmpresas?partnombre="+partnombre);
  }
  
  ListarPermisos(email:string,pagIndex:number):Observable<any>{
    return this.http.get(this.serverurl+"Client/ListarPermisosUsuario?email="+email+"&pagina="+pagIndex);
  }
  
  ActualizarDireccion(email: string,ubicacion: { Direccion: string; lat: string; lng: string; }): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    console.log ("http service envia datos",
      "Email:",email,
      
      "Coordenada :{\
        Latitud : ",ubicacion.lat,
        "Longitud : ",ubicacion.lng  
        );
    return this.http.post(this.serverurl+"Client/AgregarDireccionCliente",
    {
      Email:email,
      Direccion : ubicacion.Direccion,
      Longitud : ubicacion.lng,
      Latitud : ubicacion.lat 
    },httpOptions);
  }
  
  ListarDireccionesCliente(email:string): Observable<any>{
    console.log("email para pedit direcciones:"+email);
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/ListarDireccionesCliente?email="+email
    ,httpOptions);
  }
  
  agregarProdAlCarrito(prod:any, email: string): Observable<any>{
    console.log("Datos de producto a agregar ",prod);
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/AgregarProductoCarrito",
    {
      Email: email,
      Rut: prod.Rut,
      IdProduct: prod.ObjectId,
      Cantidad:1
    }
    ,httpOptions);
  }
  
  getCarrito(Email : string, Rut:string): Observable<any>{
    console.log(Email +" es el email del usuario y el rut de la empresa es" + Rut);
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/VerCarritodeCliente",
    {
      EmailCliente: Email,
      Rut: Rut
    }
    ,httpOptions);
  }
  
  pagaCarrito(Carrito : any ) :Observable<any>{
    console.log(Carrito.Email +" es el email del usuario y el rut de la empresa es" + Carrito.Rut,Carrito);
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/PagarCarrito",
    {
      EmailCliente: Carrito.Email,
      Rut: Carrito.Rut,
      TransaccionPaypal:Carrito.TransaccionPaypal
    }
    ,httpOptions);
  }

  BorrarDireccion(GuidDir: string): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/BorrarDireccionCliente",
    {
      GuidDireccion: GuidDir
    }
    ,httpOptions);
  }

  ComprarProductoPorPuntos(Email: string, Rut: string, ObjectId: string, Direccion: string): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/ComprarProductoConPuntos",
    {
        Rut:Rut,
        Email:Email,
        GuidProducto:ObjectId,
        Direccion:Direccion
    }
    ,httpOptions);
  }
  
  puntuarProducto(Rut: string, Email: string,GuidOrden:string, GuidProducto: string, rating: number): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/PuntuarProducto",
    {
        Rut:Rut,
        Email:Email,
        GuidProducto:GuidProducto,
        GuidOrden:GuidOrden,
        CantEstrellas:rating
    }
    ,httpOptions);
  }
  
  puntuarEmpresa(Rut: any, Guid: any, rating: any): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/PuntuarEmpresa",
    {
        Rut:Rut,
        IdOrden:Guid,
        Puntaje:rating
    }
    ,httpOptions);
  }
  
  EliminarPermiso(Rut: string, Email: string):  Observable<any>  {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/BorrarPermiso",
    {
        Rut:Rut,
        Email:Email,
    }
    ,httpOptions);
  }
  quitarProductodeCarrito(Email:string,Rut:string,ObjectId:string): Observable<any> {
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.serverurl+"Client/AgregarProductoCarrito",
    {
      Email: Email,
      Rut: Rut,
      IdProduct: ObjectId,
      Cantidad:-1
    }
    ,httpOptions);
  }
  
VerPromoPuntosCliente(Email:string , Rut:string) : Observable<any>{
  let httpOptions = {
    headers:new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  return this.http.post(this.serverurl+"Client/VerPromoPuntosCliente",
  {
    Email: Email,
    Rut: Rut
  }
  ,httpOptions);
  }
}
