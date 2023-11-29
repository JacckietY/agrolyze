import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeseasesListComponent } from './components/deseases-list/deseases-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
