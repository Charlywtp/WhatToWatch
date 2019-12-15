import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { movie } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  movieList: any;
  listingsList: any;
  popularComedy: any;
  popularAction: any;
  popularAnimation: any;
  popularHorror: any;
  popularRomance: any;
  popularMusic: any;
  popularFiction: any;

constructor(private movieService: MoviesService, private router: Router) {

  this.movieService.searchPopular().subscribe( (data: any) => {
  this.movieList = data.results;
  });

  this.movieService.searchListings().subscribe( (data: any) => {
  this.listingsList = data.results;
  });

  this.movieService.searchPopularGenre(35).subscribe( (data: any) => {
  this.popularComedy = data.results;
  });

  this.movieService.searchPopularGenre(28).subscribe( (data: any) => {
  this.popularAction = data.results;
  });

  this.movieService.searchPopularGenre(16).subscribe( (data: any) => {
  this.popularAnimation = data.results;
  });

  this.movieService.searchPopularGenre(27).subscribe( (data: any) => {
  this.popularHorror = data.results;
  });

  this.movieService.searchPopularGenre(10749).subscribe( (data: any) => {
  this.popularRomance = data.results;
  });

  this.movieService.searchPopularGenre(10402).subscribe( (data: any) => {
    this.popularMusic = data.results;
    });

  this.movieService.searchPopularGenre(878).subscribe( (data: any) => {
    this.popularFiction = data.results;
    });

  }

searchChanged(search) {
    if ( search === '') {
      this.movieService.searchPopular().subscribe( (data: any) => {
      this.movieList = data.results;
      console.log(this.movieList);
      });
    } else {
    this.movieService.searchData(search).subscribe((data: any) => {
      this.movieList = data.results;
    });
  }
}
getDetails(id){
      this.router.navigateByUrl(`/pages/tabs/tab2/movieDetails/${id}`);
  }
}
