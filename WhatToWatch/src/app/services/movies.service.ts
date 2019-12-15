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

  private apiKey: string = 'da958a49c54acd8b405ece0181cf2d8e';

  private urlMovieDb: string = 'https://api.themoviedb.org/3';

  private populars: string = '/discover/movie?sort_by=popularity.desc';

  private listings: string = '/movie/now_playing?';

  private popularComedy: string = '/discover/movie?api_key=';

  constructor(private http: HttpClient) { }

  searchPopular() {
    let url =  ` ${this.urlMovieDb}${this.populars}&api_key=${this.apiKey}&language=es` ;
    return this.http.get(url);
  }
  searchListings() {
    let url =  ` ${this.urlMovieDb}${this.listings}api_key=${this.apiKey}&language=es&page=1&region=ES` ;
    return this.http.get(url);
  }
  searchData(title: string) {
    let url =  ` ${this.urlMovieDb}/search/movie?api_key=${this.apiKey}&query=${title}&sortb_by=popularity&language=es` ;
    return this.http.get(url);

  }
  searchPopularGenre(id){
    let url =  ` ${this.urlMovieDb}${this.popularComedy}${this.apiKey}&lenguage=es&sortb_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`;
    return this.http.get(url);
  }

  getById(id: number) {
    let url =  ` ${this.urlMovieDb}/movie/${id}?api_key=${this.apiKey}&language=es` ;
    return this.http.get(url);
  }
}
