import { Component, OnInit } from '@angular/core';
import { MovieImgPipe } from '../../pipes/movie-img-pipe.pipe';
import { MoviesService } from '../../services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.page.html',
  styleUrls: ['./actor-details.page.scss'],
})

export class ActorDetailsPage {

  id: any;
  img: any;
  name: any;
  biography: any;
  movieCredits: any;
  birthdate: any;
  popularity: any;
  birthplace: any;

  constructor(private movieService: MoviesService, private router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((data: any) => {
      this.id = data['id'];
      movieService.getActorDetails(this.id).subscribe((data: any) => {
        this.img = data.profile_path;
        this.name = data.name;
        this.biography = data.biography;
        this.birthdate = data.birthday;
        this.popularity = data.popularity;
        this.birthplace = data.place_of_birth;

       });
      movieService.getActorMovieCredits(this.id).subscribe((data: any) => {this.movieCredits = data.cast; }); });
   }
}
