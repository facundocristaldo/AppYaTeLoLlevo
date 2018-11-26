import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PermisosUsuarioPage } from './permisos-usuario';

@NgModule({
  declarations: [
    PermisosUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PermisosUsuarioPage),
  ],
})
export class PermisosUsuarioPageModule {}
