npx @angular/cli new taw-frontend --routing --style=css

# Entra nel progetto
taw-frontend/

# Crea struttura moduli e componenti
ng generate module pages/flights --route flights --module app.module
ng generate module pages/aircrafts --route aircrafts --module app.module
ng generate module pages/airlines --route airlines --module app.module
ng generate module pages/routes --route routes --module app.module
ng generate module pages/seats --route seats --module app.module
ng generate module pages/tickets --route tickets --module app.module
ng generate module pages/airports --route airports --module app.module

# Genera componenti interni per ciascun modulo
ng generate component pages/flights/list
ng generate component pages/flights/detail

ng generate component pages/aircrafts/list
ng generate component pages/aircrafts/detail

ng generate component pages/airlines/list
ng generate component pages/airlines/detail

ng generate component pages/routes/list
ng generate component pages/routes/detail

ng generate component pages/seats/list
ng generate component pages/seats/detail

ng generate component pages/tickets/list
ng generate component pages/tickets/detail

ng generate component pages/airports/list
ng generate component pages/airports/detail

# Genera servizi per interfacciarsi con il backend
ng generate service services/flights
ng generate service services/aircrafts
ng generate service services/airlines
ng generate service services/routes
ng generate service services/seats
ng generate service services/tickets
ng generate service services/airports

# Routing base (modifica app-routing.module.ts)
const routes: Routes = [
  { path: 'flights', loadChildren: () => import('./pages/flights/flights.module').then(m => m.FlightsModule) },
  { path: 'aircrafts', loadChildren: () => import('./pages/aircrafts/aircrafts.module').then(m => m.AircraftsModule) },
  { path: 'airlines', loadChildren: () => import('./pages/airlines/airlines.module').then(m => m.AirlinesModule) },
  { path: 'routes', loadChildren: () => import('./pages/routes/routes.module').then(m => m.RoutesModule) },
  { path: 'seats', loadChildren: () => import('./pages/seats/seats.module').then(m => m.SeatsModule) },
  { path: 'tickets', loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule) },
  { path: 'airports', loadChildren: () => import('./pages/airports/airports.module').then(m => m.AirportsModule) },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  { path: '**', redirectTo: 'flights' }
];

# Autenticazione
ng generate service services/auth
ng generate component pages/login

# auth.service.ts - metodi suggeriti
- login(email: string, password: string): Observable<Token>
- logout(): void
- isAuthenticated(): boolean
- getToken(): string

# login.component.ts
- Form con email e password
- Submit chiama AuthService.login()
- Se successo: salva token (es. in localStorage) e reindirizza

# app.module.ts
- Importa HttpClientModule, FormsModule, ReactiveFormsModule

# Protezione rotte (opzionale)
ng generate guard guards/auth
- Implementa canActivate() per verificare login
- Applica alle rotte private
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Cambia se usi proxy

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => localStorage.setItem('token', res.token)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  error = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.error = true;
      }
    });
  }
}
export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'airline' | 'passenger';
  name?: string;
  airlineId?: string;
}
export interface Flight {
  _id: string;
  route: string;
  aircraft: string;
  departureTime: string; // ISO format
  arrivalTime: string; // ISO format
  ticketPrices: {
    economy: number;
    business: number;
    first: number;
  };
  seats: Seat[];
}

export interface Seat {
  seatNumber: string;
  class: 'economy' | 'business' | 'first';
  available: boolean;
}
export interface Route {
  _id: string;
  departureAirport: string;
  arrivalAirport: string;
  airline: string;
}
export interface Aircraft {
  _id: string;
  model: string;
  code: string;
  airline: string;
  seatLayout: {
    economy: number;
    business: number;
    first: number;
  };
}
export interface FlightSearchResult {
  flights: FlightSegment[];
  totalDuration: number; // in minutes
  totalCost: number;
  numberOfStops: number;
}

export interface FlightSegment {
  flightId: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  cost: number;
  from: string;
  to: string;
}
	
	//auth service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { email, password });
  }

  register(data: any) {
    return this.http.post<any>('http://localhost:3000/api/auth/register', data);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
//login components.tsimport { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  isLogin = true; // switch login/registrazione
  role: 'passenger' | 'airline' | 'admin' = 'passenger';
  name = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.isLogin) {
      this.auth.login(this.email, this.password).subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.router.navigate(['/dashboard']);
      });
    } else {
      const data = {
        email: this.email,
        password: this.password,
        role: this.role,
        name: this.name
      };
      this.auth.register(data).subscribe(() => {
        alert('Registrazione completata!');
        this.isLogin = true;
      });
    }
  }
}
//login components.html
<h2 *ngIf="isLogin">🔐 Login</h2>
<h2 *ngIf="!isLogin">📝 Registrazione</h2>

<form (ngSubmit)="submit()">
  <input [(ngModel)]="email" name="email" placeholder="Email" required>
  <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>

  <div *ngIf="!isLogin">
    <input [(ngModel)]="name" name="name" placeholder="Nome">
    <select [(ngModel)]="role" name="role">
      <option value="passenger">Passeggero</option>
      <option value="airline">Compagnia</option>
      <option value="admin">Admin</option>
    </select>
  </div>

  <button type="submit">{{ isLogin ? 'Login' : 'Registrati' }}</button>
</form>

<button (click)="isLogin = !isLogin">
  {{ isLogin ? 'Crea un account' : 'Hai già un account? Login' }}
</button>
//dashboard dinamica components.tsimport { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  role = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.role = this.auth.getRole() || '';
  }
}
//.html
<h2>📊 Dashboard {{ role }}</h2>

<div *ngIf="role === 'passenger'">
  <app-passenger-dashboard></app-passenger-dashboard>
</div>

<div *ngIf="role === 'airline'">
  <app-airline-dashboard></app-airline-dashboard>
</div>

<div *ngIf="role === 'admin'">
  <app-admin-dashboard></app-admin-dashboard>
</div>
//app-routing
const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: FlightSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

