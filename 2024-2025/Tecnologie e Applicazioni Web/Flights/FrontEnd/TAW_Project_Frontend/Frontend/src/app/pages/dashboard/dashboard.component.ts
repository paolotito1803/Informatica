import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/user-http.service';
import { AirlinesService, Airlines } from 'src/app/services/airlines.service';
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
  addticket = true;
  username: string = '';

  aircrafts: Aircrafts[] = [];
  tickets: (Tickets & { editing?: boolean })[] = [];

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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.adminRole = this.us.is_admin();
    this.airlineRole = this.us.is_airline();
    this.passengerRole = this.us.is_passenger();
    this.username = this.us.get_username();

    console.log('Admin?', this.adminRole);
    console.log('Airline?', this.airlineRole);
    console.log('Passenger?', this.passengerRole);
    console.log('Username?', this.username);

    if (this.airlineRole) {
      console.log("Compagnia");
      const email = this.us.get_mail();

      this.airlinesService.getAirlineByMail(email).subscribe({
        next: res => {
          console.log(res);
          console.log(res.mustChangePassword);
          if (res.mustChangePassword) {
            console.log("Devo cambiare password" + res.mustChangePassword);
            this.router.navigate(['/change-password']);
            return;
          }

          // Popola dati aggiornamento
          /*this.updateData.name = res.name;
          this.updateData.revenue = res.revenue;
          this.updateData.aircrafts = res.aircrafts;*/

          // Carica aircraft
          this.airlinesService.getAircraftByMail(email).subscribe({
            next: aircrafts => {
              this.aircrafts = aircrafts;
              console.log("Aerei Ricevuti", aircrafts);
            },
            error: err => console.error('Errore nel recupero aerei:', err)
          });

          // Carica tickets
          this.ticketsService.getTickets().subscribe({
            next: tickets => {
              this.tickets = tickets.map(t => ({_code : t._code, user : this.us.get_mail(), 
                                                flight : t.flight, seat : t.seat, 
                                                price : t.price, numBag : t.numBag, editing: false}));
              console.log('Biglietti ricevuti:', tickets);
            },
            error: err => console.error('Errore nel recupero biglietti:', err)
          });
        },
        error: err => console.error('Errore nel recupero compagnia:', err)
      });
    }
  }

  
  updateAirlineInfo() {
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
  }

    // ----- Gestione Biglietti -----

  aggiungiBiglietto() {
    this.tickets.push({
      _code: '',
      user: '',
      flight: '',
      seat: '',
      price: 0,
      numBag: 0,
      editing: true
    });
  }

  salvaBiglietto(index: number) {
    const ticket = this.tickets[index];
    if (!ticket.flight || !ticket.seat) {
      alert('Inserisci almeno volo e posto.');
      return;
    }
    this.addTicketToBackend(ticket, index);
  }

 addTicketToBackend(ticket: Tickets, index: number) {
    this.ticketsService.addTickets(ticket).subscribe({
      next: res => {
        console.log(`Biglietto per volo ${ticket.flight} aggiunto con ID ${res.id}`);
        this.tickets[index] = { ...ticket, _code: res.id, editing: false };
      },
      error: err => {
        console.error('Errore salvataggio biglietto:', err);
      }
    });
  }

  deleteTickets(ticket : Tickets){
    this.ticketsService.deleteTickets(ticket._code).subscribe({
      next : res => {
        console.log(`Biglietto per volo ${ticket.flight} cancellato`);
        this.tickets = this.tickets.filter(t => t._code !== ticket._code);
      },
      error: err => {
        console.error('Errore cancellazione biglietto:', err);
      }
    })
  }

  logout() {
    this.us.logout();
    this.router.navigate(['/search']);
  }
}




