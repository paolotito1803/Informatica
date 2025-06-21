import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    TicketsComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
