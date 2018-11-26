import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DireccionesUsuarioPage } from './direcciones-usuario';

@NgModule({
  declarations: [
    DireccionesUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(DireccionesUsuarioPage),
  ],
})
export class DireccionesUsuarioPageModule {}
