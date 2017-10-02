import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule, MdProgressBarModule } from '@angular/material';
import { NavbarComponent } from './navbar.component';
import { ProgressbarComponent } from './progressbar.component';

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
    ProgressbarComponent
  ],
  declarations: [NavbarComponent,ProgressbarComponent]
})
export class SharedModule { }
