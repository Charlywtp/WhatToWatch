import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { movie } from '../../models/movie.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  movieList: any[];
  aux: any[];
constructor(private movieService: MoviesService) {

  this.movieService.searchPopular().subscribe( (data: any) => {
  this.movieList = data.results;
  console.log(this.movieList);
  });
  }
}
