import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movieDetails',
  templateUrl: 'movieDetails.page.html',
  styleUrls: ['movieDetails.page.scss']
})
export class MovieDetailsPage {
  id: any;

  title: string;
  movie: any[];
  description: string;
  img: any;
  releaseDate: string;
  rating: string;
  web: string;
  votecount: any;
  genres: any[];


  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {

    activatedRoute.params.subscribe( data => {
      this.id = data['id'];
      moviesService.getById(this.id).subscribe((data: any) => {
        this.title = data.title;
        this.description = data.overview;
        this.img = data.backdrop_path;
        this.releaseDate = data.release_date;
        this.rating = data.vote_average;
        this.web = data.homepage;
        this.votecount = data.vote_count;
        this.genres = data.genres;
        console.log(this.genres);
    });
  });
}
}