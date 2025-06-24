import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FlightSearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserSignupComponent },
  //{ path: 'dashboard-passeggero', component: PasseggeroDashboardComponent },
  //{ path: 'dashboard-compagnia', component: CompagniaDashboardComponent },
  { path: 'search', component: FlightSearchComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' }
  /*{ path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)},
  { path: 'flights', loadChildren: () => import('./pages/flights/flights.module').then(m => m.FlightsModule) },
  { path: 'aircrafts', loadChildren: () => import('./pages/aircrafts/aircrafts.module').then(m => m.AircraftsModule) },
  { path: 'airlines', loadChildren: () => import('./pages/airlines/airlines.module').then(m => m.AirlinesModule) },
  { path: 'routes', loadChildren: () => import('./pages/routes/routes.module').then(m => m.RoutesModule) },
  { path: 'seats', loadChildren: () => import('./pages/seats/seats.module').then(m => m.SeatsModule) },
  { path: 'tickets', loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule) },
  { path: 'airports', loadChildren: () => import('./pages/airports/airports.module').then(m => m.AirportsModule) },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
  { path: '**', redirectTo: 'flights' }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
