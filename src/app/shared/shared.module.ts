import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule, MdProgressBarModule } from '@angular/material';
import { NavbarComponent } from './navbar.component';
import { ProgressbarComponent } from './progressbar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdProgressBarModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdProgressBarModule,
    NavbarComponent,
    ProgressbarComponent,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    ProgressbarComponent
  ]
})
export class SharedModule { }
