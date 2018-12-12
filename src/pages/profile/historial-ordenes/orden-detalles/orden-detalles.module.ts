import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdenDetallesPage } from './orden-detalles';

@NgModule({
  declarations: [
    OrdenDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdenDetallesPage),
  ],
})
export class OrdenDetallesPageModule {}
