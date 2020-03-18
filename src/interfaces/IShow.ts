import IMovie from './IMovie';

export default interface IShow {
    id: number;
    movie?: IMovie;
    hall: number;
    date: number;
}
