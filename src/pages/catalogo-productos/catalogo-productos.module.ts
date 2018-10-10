import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoProductosPage } from './catalogo-productos';

@NgModule({
  declarations: [
    CatalogoProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoProductosPage),
  ],
})
export class CatalogoProductosPageModule {}
