export class SearchBookingTrains{
    from: string;
    to: string;
    allClasses:string;
    quota: string;
    date: string;

    constructor(from: string, to: string, allClasses: string, quota: string, date: string) {
        this.from= from;
        this.to = to;
        this.allClasses = allClasses;
        this.quota = quota;
        this.date = date;
    }
}
