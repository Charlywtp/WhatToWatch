import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActorDetailsPage } from './actor-details.page';
import { MovieImgPipe } from 'src/app/pipes/movie-img-pipe.pipe';
import { MovieImgPipeModule } from '../../pipes/movie-img-pie.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieImgPipeModule,
    RouterModule.forChild([{ path: '', component: ActorDetailsPage }])
  ],
  declarations: [ActorDetailsPage]
})
export class ActorDetailsPageModule {}
