import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FlightSearchComponent } from './pages/search/search.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AirlinesComponent } from './pages/airlines/airlines.component';
import { AircraftsComponent } from './pages/aircrafts/aircrafts.component';
import { AirportsComponent } from './pages/airports/airports.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { PassengersComponent } from './pages/passengers/passengers.component';
import  { AdminComponent } from './pages/admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserSignupComponent },
  { path: 'airlines', component: AirlinesComponent},
  { path: 'aircrafts', component: AircraftsComponent},
  { path: 'airports', component: AirportsComponent},
  { path: 'flights', component: FlightsComponent},
  { path: 'routes', component : RoutesComponent},
  { path: 'seats', component : SeatsComponent},
  { path: 'tickets', component: TicketsComponent},
  //{ path: 'dashboard-passeggero', component: PasseggeroDashboardComponent },
  //{ path: 'dashboard-compagnia', component: CompagniaDashboardComponent },
  { path: 'search', component: FlightSearchComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'passangers', component: PassengersComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'change-password', component: ChangePasswordComponent}
  /*{ path: 'passengers', loadChildren: () => import('./pages/passengers/passengers.module').then(m => m.PassengersModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'passengers', loadChildren: () => import('./pages/passengers/passengers.module').then(m => m.PassengersModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) }

  { path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)},
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
