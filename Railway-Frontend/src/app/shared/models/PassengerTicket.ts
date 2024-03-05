import { PassengerList } from "./PassengerList";
export class PassengerTicket {
    id: string;
    userName: string;
    trainNumber: string;
    trainName: string;
    fromStation: string;
    fromStationArrivalTime: string;
    fromStationDepartureTime: string;
    toStation: string;
    toStationArrivalTime: string;
    toStationDepartureTime: string;
    date: string;
    className: string;
    passengers: PassengerList[];
    phoneNumber: string;
    email: string;
    amount: string;
    status: string;
}