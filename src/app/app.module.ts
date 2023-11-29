import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModules } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DeseasesListComponent } from './components/deseases-list/deseases-list.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { DeseasesService } from './services/deseases.service';
import { NewDeseaseComponent } from './components/new-desease/new-desease.component';


const firebaseConfig = {
  apiKey: "AIzaSyCIPE0Ap5iwccktkqwnfNaK2d7ikbtJeFc",
  authDomain: "agrolyze.firebaseapp.com",
  projectId: "agrolyze",
  storageBucket: "agrolyze.appspot.com",
  messagingSenderId: "1049359055230",
  appId: "1:1049359055230:web:5eb1042b8087904edd5b2f"
};

@NgModule({
  declarations: [
    AppComponent,
    DeseasesListComponent,
    HomeComponent,
    FilterComponent,
    NewDeseaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [DeseasesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
