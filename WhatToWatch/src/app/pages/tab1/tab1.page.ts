import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  search: any;
  movieList: any;
  constructor(private movieService: MoviesService, private router: Router) {
  }

  searchChanged(search) {
    if ( search === '') {
      this.movieList = [];
    } else {
    this.movieService.searchData(search).subscribe((data: any) => {
      this.movieList = data.results;
    });
  }
}
}
