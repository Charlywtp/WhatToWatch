import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { movie } from '../../models/movie.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    movieList: movie[];
    aux: any[];
  constructor(private movieService: MoviesService) {

    this.movieService.searchPopular().subscribe( (data: any) => {
    this.movieList = data.results;
    console.log(this.movieList);
  });
  }
}
