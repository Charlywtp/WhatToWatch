import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { movie } from '../../models/movie.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    likedMovies: any[];
    aux: any[];
  constructor(private movieService: MoviesService) {
  // this.likedMovies = this.movieService.getLikedMovies();
  }
}
