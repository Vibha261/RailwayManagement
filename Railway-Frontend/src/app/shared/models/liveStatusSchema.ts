import { Station } from "./stationSchema";

export class LiveStatus{
    previousStation: Station;
    nextStation: Station;
    currentStation:Station;

    constructor(previousStation: Station, nextStation: Station, currentStation:Station) {
       this.previousStation=previousStation;
       this.nextStation=nextStation;
       this.currentStation=currentStation;
    }
}