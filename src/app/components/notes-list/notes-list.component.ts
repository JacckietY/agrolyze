import { Component, ViewChild, AfterViewInit, OnInit, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { NoteModel } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public totalRows: number = 0;
  public pageSize: number = 10;
  public currentPage: number = 0;
  public loading: boolean = false;
  public pageSizeOptions: number[] = [10, 25, 50];
  public dataSource: MatTableDataSource<NoteModel> = new MatTableDataSource<NoteModel>();
  public displayedColumns: string[] = [];

  constructor(private notesService: NotesService, private router: Router) {
    this.displayedColumns = ["date","airTempMin","airTempMax","airTempAvg","relHumidity","precipitation","leafWetness","infection", "action"];
  }

  ngOnInit() {
    this.loadNotes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public loadNotes() {
    this.notesService.getNotes().pipe(
      map((res: any[]) => {
        // Додаємо перетворені дані у масив екземплярів DeseaseModel
        return res.map(item => {
          const noteModel: NoteModel = {
            date: item.Date.toDate(), // Перетворюємо Firebase Timestamp в JavaScript Date
            airTempAvg: item.AirTempAvg,
            airTempMax: item.AirTempMax,
            airTempMin: item.AirTempMin,
            relHumidity: item.RelHumidity,
            precipitation: item.Precipitation,
            leafWetness: item.LeafWetness,
            infection: item.Infection,
            isInfected: item.IsInfected,
            id: item.id,
          };
          return noteModel;
        });
      })
    ).subscribe((transformedData: NoteModel[]) => {
      this.dataSource.data = transformedData;
    });
  }

  public deleteNote(id: string) {
    this.notesService.deleteNote(id).then((res) => {
      console.log(res);
      this.loadNotes();
    })
  }

  public navigateToAdd() {
    this.router.navigate(['new']);
  }
}
