import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { DeseaseModel } from 'src/app/models/desease.model';
import { DeseasesService } from 'src/app/services/deseases.service';

@Component({
  selector: 'app-deseases-list',
  templateUrl: './deseases-list.component.html',
  styleUrls: ['./deseases-list.component.scss']
})
export class DeseasesListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  @ViewChild(MatSort) sort: MatSort | null;

  public totalRows: number = 0;
  public pageSize: number = 10;
  public currentPage: number = 0;
  public loading: boolean = false;
  public pageSizeOptions: number[] = [10, 25, 50];
  public dataSource: MatTableDataSource<DeseaseModel> = new MatTableDataSource<DeseaseModel>();
  public displayedColumns: string[] = [];

  constructor(private deseasesService: DeseasesService) {
    this.displayedColumns = ["date","airTempMin","airTempMax","airTempAvg","relHumidity","precipitation","leafWetness","infection", "action"];
  }

  public ngOnInit() {
    this.loadDeseases();
  }

  public loadDeseases() {
    this.deseasesService.getDeseases().pipe(
      map((res: any[]) => {
        // Додаємо перетворені дані у масив екземплярів DeseaseModel
        return res.map(item => {
          const deseasemodel: DeseaseModel = {
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
          return deseasemodel;
        });
      })
    ).subscribe((transformedData: DeseaseModel[]) => {
      this.dataSource.data = transformedData;
    });
  }

  public deleteDesease(id: string) {
    this.deseasesService.deleteDesease(id).then((res) => {
      console.log(res);
      this.loadDeseases();
    })
  }
}
