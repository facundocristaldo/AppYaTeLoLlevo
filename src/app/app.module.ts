import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { CatalogoEmpresasPage } from '../pages/catalogo-empresas/catalogo-empresas';
import { CatalogoProductosPage } from '../pages/catalogo-productos/catalogo-productos';

import { Facebook } from '@ionic-native/facebook';
import { HttpserviceProvider } from '../providers/httpservice/httpservice';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePage } from '../pages/profile/profile';
import { IonicStorageModule } from '@ionic/storage'
import { ImagePicker } from '@ionic-native/image-picker';
import { PermisosUsuarioPage } from '../pages/profile/permisos-usuario/permisos-usuario';
import { Geolocation } from '@ionic-native/geolocation'
import { ChangeipserverPage } from '../pages/changeipserver/changeipserver';
import { DatosUsuarioPage } from '../pages/profile/datos-usuario/datos-usuario';
import { DireccionesUsuarioPage } from '../pages/profile/direcciones-usuario/direcciones-usuario';
import { GoogleMapComponent } from '../pages/profile/direcciones-usuario/google-map/google-map';
import { ProductoDetallesPage } from '../pages/catalogo-productos/producto-detalles/producto-detalles';
import { CarritoComprasPage } from '../pages/catalogo-productos/carrito-compras/carrito-compras';
import { PagoCarritoPage } from '../pages/catalogo-productos/carrito-compras/pago-carrito/pago-carrito';
import { PayPal } from '@ionic-native/paypal';
import { HistorialOrdenesPage } from '../pages/profile/historial-ordenes/historial-ordenes';
import { OrdenDetallesPage } from '../pages/profile/historial-ordenes/orden-detalles/orden-detalles';
import { RatingStarsComponent } from '../components/rating-stars/rating-stars';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    CatalogoEmpresasPage,
    CatalogoProductosPage,
    ProductoDetallesPage,
    ProfilePage,
    GoogleMapComponent,
    ChangeipserverPage,
    DireccionesUsuarioPage,
    PermisosUsuarioPage,
    DatosUsuarioPage,
    CarritoComprasPage,
    PagoCarritoPage,
    HistorialOrdenesPage,
    OrdenDetallesPage,
    RatingStarsComponent
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    OrdenDetallesPage,
    MyApp,
    HomePage,
    RegistroPage,
    CatalogoEmpresasPage,
    CatalogoProductosPage,
    ProductoDetallesPage,
    ProfilePage,
    ChangeipserverPage,
    DatosUsuarioPage,
    DireccionesUsuarioPage,
    PermisosUsuarioPage,
    CarritoComprasPage,
    PagoCarritoPage,
    HistorialOrdenesPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpserviceProvider,
    ImagePicker,
    PayPal,
    Geolocation,
    
  ]
})
export class AppModule { }
