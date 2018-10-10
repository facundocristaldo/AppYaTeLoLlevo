import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoEmpresasPage } from './catalogo-empresas';

@NgModule({
  declarations: [
    CatalogoEmpresasPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoEmpresasPage),
  ],
})
export class CatalogoEmpresasPageModule {}
