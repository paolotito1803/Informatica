import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatsComponent } from './seats.component';

const routes: Routes = [{ path: '', component: SeatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatsRoutingModule { }
