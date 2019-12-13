import { Injectable } from '@angular/core';
import { movie } from '../models/movie.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { concat } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private imgLink: string= "https://image.tmdb.org/t/p/w500";

  private apiKey: string = 'da958a49c54acd8b405ece0181cf2d8e';

  private urlMovieDb: string = "http://api.themoviedb.org/3";

  private populars: string = "/discover/movie?sort_by=popularity.desc";

  constructor(private http: HttpClient) { }

  searchPopular(){
    let url =  ` ${this.urlMovieDb}${this.populars}&api_key=${this.apiKey}&language=es ` ;
    return this.http.get(url);
  }
}
