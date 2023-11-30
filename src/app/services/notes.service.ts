import { Injectable } from '@angular/core';
import { Firestore, addDoc, doc, collection, collectionData, deleteDoc } from '@angular/fire/firestore';
import { NoteModel } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private fs: Firestore) { }

  public getNotes() {
    let notesCollection = collection(this.fs, 'Notes');
    return collectionData(notesCollection, {idField: 'id'});
  }

  public postNote(note: NoteModel) {
    let data = {
      Date: note.date,
      AirTempAvg: note.airTempAvg,
      AirTempMax: note.airTempMax,
      AirTempMin: note.airTempMin,
      RelHumidity: note.relHumidity,
      Precipitation: note.precipitation,
      LeafWetness: note.leafWetness,
      Infection: note.infection,
      IsInfected: note.isInfected
    };
    let notesCollection = collection(this.fs, 'Notes');
    return addDoc(notesCollection, data);
  }

  public deleteNote(id: string) {
    let docRef = doc(this.fs, 'Notes/'+id);

    return deleteDoc(docRef);
  }
}
