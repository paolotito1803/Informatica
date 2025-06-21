import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlinesComponent } from './airlines.component';

const routes: Routes = [{ path: '', component: AirlinesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlinesRoutingModule { }
