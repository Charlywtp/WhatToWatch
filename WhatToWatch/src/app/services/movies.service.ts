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

  likedMovies: any[] = [];

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

  searchSimilars(id){
    let url =  ` ${this.urlMovieDb}/movie/${id}/similar?api_key=${this.apiKey}&lenguage=es&page=1`;
    return this.http.get(url);

  }

  getMovieVideo(id){
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  getMovieReview(id) {
    let url = `${this.urlMovieDb}/movie/${id}/reviews?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url);

  }

  getById(id: number) {
    let url =  ` ${this.urlMovieDb}/movie/${id}?api_key=${this.apiKey}&language=es` ;
    return this.http.get(url);
  }
  


  likeMovie(id){
    this.likedMovies.push(id);
  }
  getLikedMovies(){
    return this.likedMovies;
  }

  dislikeMovie(id){
       for ( let i = 0; i < this.likedMovies.length ; i = i + i) {
          if ( this.likedMovies[i].id === id ) {this.likedMovies.splice( i, i); return; }
       }
  }
  getLikeStatus(id) {
    for ( let i = 0; i < this.likedMovies.length ; i = i + i) {
      if ( this.likedMovies[i].id === id ) { return true; }
   }
    return false;
  }
}
