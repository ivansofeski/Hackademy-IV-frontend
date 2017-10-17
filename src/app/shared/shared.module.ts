import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule,
         MatIconModule,
         MatToolbarModule,
         MatMenuModule,
         MatButtonModule,
         MatProgressBarModule,
         MatNativeDateModule,
         MatDatepickerModule,
         MatRadioModule,
         MatSelectModule,
         MatInputModule,
         MatListModule,
         MatExpansionModule,
         MatTableModule,
         MatSortModule,
         MatPaginatorModule
        } from '@angular/material';
import { NavbarComponent } from './navbar.component';
import { ProgressbarComponent } from './progressbar.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { DonateButtonComponent } from './donate-button/donate-button.component';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHC4hLZ_ogiMaGy9kVZl4u0gjocEyw3EA',
<<<<<<< HEAD
      libraries: ['places']
=======
      libraries: ["places"]
>>>>>>> dragable, clickable and searchbar are added now
    })
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NavbarComponent,
    ProgressbarComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    DonateButtonComponent
  ],
  declarations: [
    NavbarComponent,
    ProgressbarComponent,
    DonateButtonComponent
  ]
})
export class SharedModule { }
