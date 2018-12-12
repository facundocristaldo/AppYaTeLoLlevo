import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialOrdenesPage } from './historial-ordenes';

@NgModule({
  declarations: [
    HistorialOrdenesPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialOrdenesPage),
  ],
})
export class HistorialOrdenesPageModule {}
