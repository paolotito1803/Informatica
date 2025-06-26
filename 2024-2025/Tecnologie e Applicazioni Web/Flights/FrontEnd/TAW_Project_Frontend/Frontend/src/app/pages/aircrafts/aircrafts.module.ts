import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AircraftsRoutingModule } from './aircrafts-routing.module';
import { AircraftsComponent } from './aircrafts.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    AircraftsComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AircraftsRoutingModule
  ]
})
export class AircraftsModule { }
