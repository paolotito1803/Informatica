import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirlinesRoutingModule } from './airlines-routing.module';
import { AirlinesComponent } from './airlines.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    AirlinesComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AirlinesRoutingModule
  ]
})
export class AirlinesModule { }
