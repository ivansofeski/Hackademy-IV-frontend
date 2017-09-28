import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule, MdProgressBarModule } from '@angular/material';
import { ProgressbarComponent } from './progressbar.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdProgressBarModule
   
    
    
  ],
  exports: [
    CommonModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdProgressBarModule,
    ProgressbarComponent  
   
  ],
  declarations: [ProgressbarComponent]
})
export class SharedModule { }
