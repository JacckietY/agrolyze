export class DeseaseModel {
    public date: Date;
    public airTempAvg: number;
    public airTempMax: number;
    public airTempMin: number;
    public relHumidity: number;
    public precipitation: number;
    public leafWetness: number;
    public infection: number;
    public isInfected: boolean | null;
    public id: string;
}