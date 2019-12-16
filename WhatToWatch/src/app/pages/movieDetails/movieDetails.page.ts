import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ThrowStmt } from '@angular/compiler';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { AlertController } from '@ionic/angular';


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
  imgPoster: any;
  releaseDate: string;
  rating: string;
  web: string;
  votecount: any;
  genres: any[];
  similars: any;
  adult: boolean;
  liked: boolean;
  video: any;
  reviews: any;
  cast: any;
  lists: any;
  showLists: any;


  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private youtube: YoutubeVideoPlayer, private alertCtrl:AlertController) {
    this.liked = false;
    this.showLists = false;
    this.lists = moviesService.getLists();
    activatedRoute.params.subscribe( data => {
      this.video = 'https://www.youtube.com/watch?v=';
      this.id = data['id'];
      moviesService.getById(this.id).subscribe((data: any) => {
        this.title = data.title;
        this.description = data.overview;
        this.img = data.backdrop_path;
        this.imgPoster = data.poster_path;
        this.releaseDate = data.release_date;
        this.rating = data.vote_average;
        this.web = data.homepage;
        this.votecount = data.vote_count;
        this.genres = data.genres;
        this.adult = data.adult;
        console.log(this.adult);
    });

      moviesService.getMovieVideo(this.id).subscribe(( data: any) => {
        this.video = data.results[0].key;
        console.log(this.video);
        } );

      moviesService.getMovieReview(this.id).subscribe( ( data: any ) => { this.reviews = data.results; } );
      moviesService.getMovieCast(this.id).subscribe( ( data: any ) => { this.cast = data.cast; } );
      moviesService.searchSimilars(this.id).subscribe( ( data: any ) => {
        this.similars = data.results;
        });

      this.liked = moviesService.getLikeStatus(this.id);

  });
}
  likeMovie() {
    if (!this.liked) { this.liked = true; }
    else { this.liked = false; }
    }
   watch(){
      this.youtube.openVideo(this.video);
   }
    showList() {this.showLists = !this.showLists ; }

    addMovieToList(listName) {
        console.log(listName);
        this.moviesService.addMovieToList(listName, this.title, this.id, this.imgPoster);
    }
  }
