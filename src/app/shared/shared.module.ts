import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdIconModule, MdToolbarModule, MdMenuModule, MdButtonModule, MdProgressBarModule } from '@angular/material';
import { NavbarComponent } from './navbar.component';
import { ProgressbarComponent } from './progressbar.component';
<<<<<<< HEAD
import {RouterModule} from '@angular/router';
import { AgmCoreModule } from '@agm/core';
=======
import { DonateButtonComponent } from './donate-button/donate-button.component';
import { FabButton } from './donate-button/fab-button';
import { FabToggle } from './donate-button/fab-toggle';
import { Fab } from './donate-button/fab';
>>>>>>> don't pull

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHC4hLZ_ogiMaGy9kVZl4u0gjocEyw3EA'
    })
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
<<<<<<< HEAD
    RouterModule,
    AgmCoreModule
  ],
  declarations: [
    NavbarComponent,
    ProgressbarComponent
  ]
=======
    DonateButtonComponent,
    FabButton,
    FabToggle,
    Fab
  ],
  declarations: [NavbarComponent,ProgressbarComponent, DonateButtonComponent,FabToggle,FabButton,Fab]
>>>>>>> don't pull
})
export class SharedModule { }
