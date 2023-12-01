import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteModel } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit{

  public noteForm: FormGroup;
  public isLoading: boolean;
  public newNote: NoteModel = new NoteModel();

  constructor(private formBuilder: FormBuilder, private router: Router, private notesService: NotesService) {}
  
  ngOnInit(): void {
    this.isLoading = true;
      this.noteForm = this.formBuilder.group({
        date: new FormControl(Date, [Validators.required]),
        airTempMin: new FormControl(null, [Validators.required]),
        airTempMax: new FormControl(null, [Validators.required]),
        //airTempAvg: new FormControl(null, [Validators.required]),
        leafWetness: new FormControl(null, [Validators.required, Validators.min(0)]),
        relHumidity: new FormControl(null, [Validators.required, Validators.min(0)]),
        precipitation: new FormControl(null, [Validators.required, Validators.min(0)]),
        infection: new FormControl(null, [Validators.required, Validators.min(0)]),
        //isInfected: new FormControl(false)
      })
    this.isLoading = false;
  }

  public onSubmit() {
    if(this.noteForm.valid) {
      this.newNote = {
        date: this.noteForm.get('date')?.value,
        airTempMin: this.noteForm.get('airTempMin')?.value,
        airTempMax: this.noteForm.get('airTempMax')?.value,
        airTempAvg: (this.noteForm.get('airTempMin')?.value + this.noteForm.get('airTempMax')?.value)/2,
        relHumidity: this.noteForm.get('relHumidity')?.value,
        precipitation: this.noteForm.get('precipitation')?.value,
        leafWetness: this.noteForm.get('leafWetness')?.value,
        infection: this.noteForm.get('infection')?.value,
        isInfected: this.noteForm.get('infection')?.value > 0 ? true : false
      };
      
      this.notesService.postNote(this.newNote).then((res) => {
        this.router.navigate(['']);
      })
    } else {
      console.log('form is not valid');
    }
  }

  public onCancel() {
    this.router.navigate(['']);
  }
}
