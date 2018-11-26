import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoComprasPage } from './carrito-compras';

@NgModule({
  declarations: [
    CarritoComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoComprasPage),
  ],
})
export class CarritoComprasPageModule {}
