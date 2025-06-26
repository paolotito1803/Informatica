import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirportsRoutingModule } from './airports-routing.module';
import { AirportsComponent } from './airports.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    AirportsComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AirportsRoutingModule
  ]
})
export class AirportsModule { }
