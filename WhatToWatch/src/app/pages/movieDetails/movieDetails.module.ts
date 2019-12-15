import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieDetailsPage } from './movieDetails.page';
import { MovieImgPipeModule } from '../../pipes/movie-img-pie.module';

@NgModule({
  imports: [
    MovieImgPipeModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MovieDetailsPage }])
  ],
  declarations: [MovieDetailsPage]
})
export class MovieDetailsModule {}
