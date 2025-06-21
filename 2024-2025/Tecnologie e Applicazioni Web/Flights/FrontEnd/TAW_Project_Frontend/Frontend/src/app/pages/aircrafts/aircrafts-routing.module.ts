import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftsComponent } from './aircrafts.component';

const routes: Routes = [{ path: '', component: AircraftsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AircraftsRoutingModule { }
