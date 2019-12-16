import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { concat } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { stringify } from 'querystring';
import { movie } from '../models/movie.model';
import { MovieList } from '../models/movieList.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {



  private apiKey = 'da958a49c54acd8b405ece0181cf2d8e';

  private urlMovieDb = 'https://api.themoviedb.org/3';

  private populars = '/discover/movie?sort_by=popularity.desc';

  private listings = '/movie/now_playing?';

  private popularComedy = '/discover/movie?api_key=';

  public listOfList: MovieList[];
  public jumanji: movie;
  public frozen: movie
  public accion: MovieList;
  public clasicos: MovieList;
  public aux;

  constructor(private http: HttpClient) {
    this.listOfList = [];
    this.jumanji = new movie('Jumanji: siguiente nivel','/6sjMsBcIuqU44GpG5tL33KUFOQR.jpg', 512200);
    this.frozen = new movie('Frozen 2','/v1fpZyvp6TPboNoaWBUeoluAKfT.jpg', 330457);
    this.clasicos = new MovieList('Clasicos');
    this.accion = new MovieList('Acción');
    this.clasicos.films.push(this.jumanji);
    this.accion.films.push(this.frozen);
    this.listOfList.push(this.clasicos);
    this.listOfList.push(this.accion);

   }

  likedMovies: any[] = [];



  searchPopular() {
    const url =  ` ${this.urlMovieDb}${this.populars}&api_key=${this.apiKey}&language=es` ;
    return this.http.get(url);
  }
  searchListings() {
    const url =  ` ${this.urlMovieDb}${this.listings}api_key=${this.apiKey}&language=es&page=1&region=ES` ;
    return this.http.get(url);
  }
  searchData(title: string) {
    const url =  ` ${this.urlMovieDb}/search/movie?api_key=${this.apiKey}&query=${title}&sortb_by=popularity&language=es` ;
    return this.http.get(url);

  }
  searchPopularGenre(id) {
    const url =  ` ${this.urlMovieDb}${this.popularComedy}${this.apiKey}&lenguage=es&sortb_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`;
    return this.http.get(url);
  }

  searchSimilars(id) {
    const url =  ` ${this.urlMovieDb}/movie/${id}/similar?api_key=${this.apiKey}&lenguage=es&page=1`;
    return this.http.get(url);

  }

  getMovieVideo(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  getMovieReview(id) {
    const url = `${this.urlMovieDb}/movie/${id}/reviews?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url);

  }

  getMovieCast(id) {
    const url = `${this.urlMovieDb}/movie/${id}/credits?api_key=${this.apiKey}`;
    return this.http.get(url);
  }


  getById(id: number) {
    const url =  ` ${this.urlMovieDb}/movie/${id}?api_key=${this.apiKey}&language=es` ;
    return this.http.get(url);
  }

  getActorDetails(id) {
    const url = `${this.urlMovieDb}/person/${id}?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  getActorMovieCredits(id) {
    const url = `${this.urlMovieDb}/person/${id}/movie_credits?api_key=${this.apiKey}&language=es`;
    return this.http.get(url);
  }

  likeMovie(id) {
    this.likedMovies.push(id);
  }
  getLikedMovies() {
    return this.likedMovies;
  }

  dislikeMovie(id) {
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

  createList(name) {
    this.aux = new MovieList(name);
    this.listOfList.push(this.aux);
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
      this.getListByName(listName).films.push(new movie(movieName, movieImg, movieId));
  }

  getLists() {return this.listOfList; }
}
