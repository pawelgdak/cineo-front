export default interface IMovie {
    id: number;
    title: string;
    image: string;
    smallImage: string;
    duration: number;
    director: string;
    description: string;
    production: string;
    yearOfProduction: number;
    genre: string;
    cast: Array<string>;
    imdbScore: number;
    metacriticScore: number;
    rottenTomatoesScore: number;
}
