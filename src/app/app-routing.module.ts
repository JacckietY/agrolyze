import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { HomeComponent } from './components/home/home.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'register', component: RegistrationComponent},
  { path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'new', component: NewNoteComponent, canActivate: [AngularFireAuthGuard]},
  { path: '**', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
