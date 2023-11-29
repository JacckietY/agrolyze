import { Injectable } from '@angular/core';
import { Firestore, addDoc, doc, collection, collectionData, deleteDoc } from '@angular/fire/firestore';
import { DeseaseModel } from '../models/desease.model';

@Injectable({
  providedIn: 'root'
})
export class DeseasesService {

  constructor(private fs: Firestore) { }

  public getDeseases() {
    let deseasesCollection = collection(this.fs, 'deseases');
    return collectionData(deseasesCollection, {idField: 'id'});
  }

  public postDesease(desease: DeseaseModel) {
    let data = {
      date: desease.date,
      airTempAvg: desease.airTempAvg,
      airTempMax: desease.airTempMax,
      airTempMin: desease.airTempMin,
      relHumidity: desease.relHumidity,
      precipitation: desease.precipitation,
      leafWetness: desease.leafWetness,
      infection: desease.infection
    };
    let deseasesCollection = collection(this.fs, 'deseases');
    return addDoc(deseasesCollection, data);
  }

  public deleteDesease(id: string) {
    let docRef = doc(this.fs, 'deseases/'+id);

    return deleteDoc(docRef);
  }
}
