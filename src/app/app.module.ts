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
import { ProductoDetallesPage } from '../pages/producto-detalles/producto-detalles';

import { Facebook } from '@ionic-native/facebook';
import { HttpserviceProvider } from '../providers/httpservice/httpservice';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePage } from '../pages/profile/profile';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    CatalogoEmpresasPage,
    CatalogoProductosPage,
    ProductoDetallesPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    CatalogoEmpresasPage,
    CatalogoProductosPage,
    ProductoDetallesPage,
    ProfilePage
  ],
  providers: [
   Facebook,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpserviceProvider
  ]
})
export class AppModule { }
