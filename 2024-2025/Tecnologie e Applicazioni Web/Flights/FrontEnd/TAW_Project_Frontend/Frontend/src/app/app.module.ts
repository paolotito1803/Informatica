import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

// Services
import { UserHttpService } from './user-http.service';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FlightSearchComponent } from './pages/search/search.component';
import { SocketioService } from './socketio.service';
import { FlightSearchService } from './services/search.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AircraftsComponent } from './pages/aircrafts/aircrafts.component';
import { AirlinesComponent } from './pages/airlines/airlines.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { AirportsComponent } from './pages/airports/airports.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PassangersService } from './services/passangers.service';
import { AdminService } from './services/admin.service';
import { AirlinesService } from './services/airlines.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
/*import { AdminModule } from './pages/admin/admin.module';
import { PassengersModule } from './pages/passengers/passengers.module';*/



@NgModule({
declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    AirlinesComponent,
    PassengersComponent,
    AdminComponent,
    AircraftsComponent,
    AirportsComponent,
    FlightsComponent,
    RoutesComponent,
    SeatsComponent,
    FlightSearchComponent,
    DashboardComponent,
    TicketsComponent,
    ChangePasswordComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
    /*AdminModule,
    PassengersModule*/
  ],
  providers: [
    {provide: UserHttpService, useClass: UserHttpService },
    {provide: SocketioService, useClass: SocketioService },
    {provide: FlightSearchService, useClass: FlightSearchService},
    {provide: AirlinesService, useClass: AirlinesService},
    {provide: PassangersService, useClass: PassangersService},
    {provide: AdminService, useClass: AdminService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
