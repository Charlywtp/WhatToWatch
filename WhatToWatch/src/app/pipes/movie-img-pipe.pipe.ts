import { Pipe, PipeTransform } from '@angular/core';
import { concat } from 'rxjs';

@Pipe({
  name: 'movieImgPipe'
})
export class MovieImgPipe implements PipeTransform {

  private imgLink = 'https://image.tmdb.org/t/p/w500';
  private imgNotFound = 'assets/img/noPhoto.png';

  transform(value: any, ...args: any[]): any {
    if (value) {
      return this.imgLink.concat(value);
    } else { return this.imgNotFound; }
  }

}
