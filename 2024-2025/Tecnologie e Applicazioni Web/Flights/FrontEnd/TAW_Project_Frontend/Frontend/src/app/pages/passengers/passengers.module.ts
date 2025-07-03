import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengersRoutingModule } from './passengers-routing.module';
import { PassengersComponent } from './passengers.component';


@NgModule({
  declarations: [
    PassengersComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule
  ]
  /*exports: [
    PassengersComponent
  ]*/
})
export class PassengersModule { }
