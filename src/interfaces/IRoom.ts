import ISeat from './ISeat';

export default interface IRoom {
    id: number;
    seatMap: string;
    seats: Array<ISeat>;
}
