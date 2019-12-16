import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    likedMovies: any[];
    aux: any[];
    lists: any[];
  constructor(private movieService: MoviesService, private alertCtrl: AlertController) {
    this.lists = this.movieService.getLists();
  // this.likedMovies = this.movieService.getLikedMovies();
  }
  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'Lista',
          type: 'text',
          placeholder: 'Nombre de la lista'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: any) => {
            this.movieService.createList(data.Lista);
            console.log(data.Lista);
          }
        }
      ]
    });

    await alert.present();
  }
}

