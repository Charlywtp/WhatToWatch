import { movie } from './movie.model';
export class MovieList {
        listId: number;
        listName: string;
        films: movie[];

        constructor(name: string) {
            this.listId = new Date().getTime();
            this.listName = name;
            this.films = [];
        }
}
