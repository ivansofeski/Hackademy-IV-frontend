import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule , MdProgressBarModule} from '@angular/material';

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
    MdProgressBarModule
  ],
  declarations: []
})
export class SharedModule { }
