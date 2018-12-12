import { NgModule } from '@angular/core';
import { GoogleMapComponent } from '../pages/profile/direcciones-usuario/google-map/google-map';
import { RatingStarsComponent } from './rating-stars/rating-stars';
@NgModule({
	declarations: [GoogleMapComponent,
    RatingStarsComponent],
	imports: [],
	exports: [GoogleMapComponent,
    RatingStarsComponent]
})
export class ComponentsModule {}
