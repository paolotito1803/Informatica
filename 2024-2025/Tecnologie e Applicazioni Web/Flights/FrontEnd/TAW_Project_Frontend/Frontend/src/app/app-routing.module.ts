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
  { path: 'search', component: FlightSearchComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'passangers', component: PassengersComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
