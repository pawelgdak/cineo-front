import IMovie from './IMovie';

export default interface IShow {
    id: number;
    movieId: number;
    roomId: number;
    dateAndTimeOfShows: number;
    language: string;
    subtitles: string;
    price: number;
}
