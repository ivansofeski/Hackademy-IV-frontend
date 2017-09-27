import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule , MdProgressBarModule} from '@angular/material';
=======
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule , MatProgressBarModule} from '@angular/material';
>>>>>>> adding project description structure and the progress bar module

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
<<<<<<< HEAD
    MdProgressBarModule
=======
    MatProgressBarModule
>>>>>>> adding project description structure and the progress bar module
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
<<<<<<< HEAD
    MdProgressBarModule
=======
    MatProgressBarModule
>>>>>>> adding project description structure and the progress bar module
  ],
  declarations: []
})
export class SharedModule { }
