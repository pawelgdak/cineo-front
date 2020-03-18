import IMovie from './IMovie';
import IShow from './IShow';

export default interface IMovieShows {
    date: number;
    movie: IMovie;
    shows: Array<IShow>;
}
