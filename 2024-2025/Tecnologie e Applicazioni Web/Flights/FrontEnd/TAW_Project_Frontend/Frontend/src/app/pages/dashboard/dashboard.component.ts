import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/user-http.service';
import { AirlinesService } from 'src/app/services/airlines.service';
import { TicketsService, Tickets } from 'src/app/services/tickets.service';
import { Aircrafts } from 'src/app/services/aircrafts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminRole = false;
  airlineRole = false;
  passengerRole = false;

  aircrafts: Aircrafts[] = [];
  tickets: Tickets[] = [];

updateData: {
    name: string,
    revenue: number,
    aircrafts: Aircrafts[]
  } = {
    name: '',
    revenue: 0,
    aircrafts: []
  };


  constructor(
    private us: UserHttpService,
    private airlinesService: AirlinesService,
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminRole = this.us.is_admin();
    this.airlineRole = this.us.is_airline();
    this.passengerRole = this.us.is_passenger();

    if (this.airlineRole) {
      const email = this.us.get_mail();
       /*this.airlinesService.getAirlineByMail(email).subscribe({
        next: res => {
          console.log("Airline data:", res);
          this.aircrafts = res.aircrafts || [];
        },
        error: err => {
          console.error("Errore caricamento airline:", err);
        }
      });*/
      /*this.airlinesService.getAircraft().subscribe(res => {
        this.aircrafts = res;
      })*/
      this.airlinesService.getAirlineByMail(email).subscribe({
        next: res => {
          console.log("Airline data:", res);
          this.updateData = {
            name: res.name || '',
            revenue: res.revenue || 0,
            aircrafts: res.aircrafts || []
          };
          this.aircrafts = res.aircrafts || [];
        },
        error: err => {
          console.error("Errore caricamento airline:", err);
        }
      });

      this.ticketsService.getTickets().subscribe(res => {
        console.log('Biglietti ricevuti:', res); // Debug temporaneo
        this.tickets = res;
      });
    }
  }

  logout() {
    this.us.logout();
    this.router.navigate(['/search']);
  }
}

  /*updateAirlineInfo() {
    const email = this.us.get_mail();
    const data = {
      name: this.updateData.name,
      revenue: this.updateData.revenue
    };

    this.airlinesService.updateAirlines(email, data).subscribe({
      next: res => {
        console.log('Airline aggiornata:', res);
        // Aggiorna localmente in caso di cambiamenti
        this.updateData.name = res.name;
        this.updateData.revenue = res.revenue;
      },
      error: err => {
        console.error('Errore aggiornamento airline:', err);
      }
    });
  }*/
