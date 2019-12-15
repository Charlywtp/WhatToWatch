import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ThrowStmt } from '@angular/compiler';

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
  similars: any;
  adult: boolean;
  liked: boolean;


  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {
    this.liked = false;
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
        this.adult = data.adult;
        console.log(this.adult);
    });
      moviesService.searchSimilars(this.id).subscribe( (data: any) => {
        this.similars = data.results;
        });
      this.liked = moviesService.getLikeStatus(this.id);
  });
}
  likeMovie() {
    if (!this.liked) { this.liked = true; }
    else { this.liked = false; }
    }
  }
