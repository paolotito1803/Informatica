import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatsRoutingModule } from './seats-routing.module';
import { SeatsComponent } from './seats.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    SeatsComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SeatsRoutingModule
  ]
})
export class SeatsModule { }
