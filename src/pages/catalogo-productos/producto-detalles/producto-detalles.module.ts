import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoDetallesPage } from './producto-detalles';

@NgModule({
  declarations: [
    ProductoDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductoDetallesPage),
  ],
})
export class ProductoDetallesPageModule {}
