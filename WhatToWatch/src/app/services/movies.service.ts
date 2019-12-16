import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { concat } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { stringify } from 'querystring';
import { movie } from '../models/movie.model';
import { MovieList } from '../models/movieList.model';


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

  listOfList: MovieList[] = [];

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

  getMovieCast(id) {
    let url = `${this.urlMovieDb}/movie/${id}/credits?api_key=${this.apiKey}`
    return this.http.get(url);
  }


  getById(id: number) {
    let url =  ` ${this.urlMovieDb}/movie/${id}?api_key=${this.apiKey}&language=es` ;
    return this.http.get(url);
  }
  
  getActorDetails(id) {
    let url =`${this.urlMovieDb}/person/${id}?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  getActorMovieCredits(id) {
    let url = `${this.urlMovieDb}/person/${id}/movie_credits?api_key=${this.apiKey}&language=es`;
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

  createList(listName) {
    listName = new MovieList(listName);
    this.listOfList.push(listName);
  }

  getListById(listId) {
    for (let i = 0; i < this.listOfList.length ; i = i + 1) {
      if (this.listOfList[i].listId === listId) {return this.listOfList[i]; }
     }
  }
  getListByName(listName) {
    for (let i = 0; i < this.listOfList.length ; i = i + 1) {
      if (this.listOfList[i].listName === listName) {return this.listOfList[i]; }
     }
  }

  deleteList(listId) {
    for (let i = 0; i < this.listOfList.length ; i = i + 1) {
      if (this.listOfList[i].listId === listId) { this.listOfList.splice( i, i ); }
     }
  }

  addMovieToList(listName, movieName, movieId, movieImg) {
      this.getListByName(listName).films.push(new movie(movieName, movieId, movieImg));
  }

  getLists() {return this.listOfList; }
}
