export default interface IMovie {
    id: number;
    title: string;
    img: string;
    duration: number;
    description: string;
    genre: string;
    cast: Array<string>;
    imdbRating: number;
    metacriticRating: number;
}
