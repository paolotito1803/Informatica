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
  seat: string = '';
  price: number = 0;
  numBag: number = 0;

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

  updateTicketData: {
    seat: string,
    price: number,
    numBag: number
  } = {
    seat: '',
    price: 0,
    numBag: 0
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

    if(this.passengerRole){
      this.handlePendingDirectTicket();
      this.handlePendingLayoverTickets();
    }

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

  handlePendingDirectTicket() {
    const pendingTicket = localStorage.getItem('pendingTicket');
    if (pendingTicket) {
      const ticketData = JSON.parse(pendingTicket);
      console.log('Acquisto automatico volo diretto:', ticketData);
      this.ticketsService.addTickets(ticketData).subscribe({
        next: () => {
          alert('Biglietto acquistato con successo!');
          localStorage.removeItem('pendingTicket');
        },
        error: err => {
          console.error('Errore durante l\'acquisto del biglietto:', err);
          alert('Errore durante l\'acquisto del biglietto.');
          localStorage.removeItem('pendingTicket');
        }
      });
    }
  }

  handlePendingLayoverTickets() {
    const pendingLayover = localStorage.getItem('pendingLayoverTickets');
    if (pendingLayover) {
      const [firstTicket, secondTicket] = JSON.parse(pendingLayover);
      console.log('Acquisto automatico voli con scalo:', firstTicket, secondTicket);

      this.ticketsService.addTickets(firstTicket).subscribe({
        next: () => {
          this.ticketsService.addTickets(secondTicket).subscribe({
            next: () => {
              alert('Entrambi i voli acquistati con successo!');
              localStorage.removeItem('pendingLayoverTickets');
            },
            error: err => {
              console.error('Errore acquisto secondo volo:', err);
              alert('Primo volo acquistato, ma errore sul secondo.');
              localStorage.removeItem('pendingLayoverTickets');
            }
          });
        },
        error: err => {
          console.error('Errore acquisto primo volo:', err);
          alert('Errore durante l\'acquisto del primo volo.');
          localStorage.removeItem('pendingLayoverTickets');
        }
      });
    }
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

  loadTickets(){
    this.ticketsService.getTickets().subscribe({
      next: tickets => {
        this.tickets = tickets.map(t => ({_code : t._code, user : this.us.get_mail(), 
                                          flight : t.flight, seat : t.seat, 
                                          price : t.price, numBag : t.numBag, editing: false}));
            },
            error: err => console.error('Errore nel recupero biglietti:', err)
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
        this.loadTickets();
        this.tickets = this.tickets.filter(t => t._code !== ticket._code);
      },
      error: err => {
        console.error('Errore cancellazione biglietto:', err);
      }
    })
  }

  updateTicketInfo(){
    const data = {
      seat : this.updateTicketData.seat,
      price : this.updateTicketData.price,
      numBag : this.updateTicketData.numBag

    }
  }

 updateTickets(ticket: Tickets & {editing?: boolean}){
    const data: any = {};
    if (ticket.seat !== undefined && ticket.seat !== null) data.seat = ticket.seat;
    if (ticket.price !== undefined && ticket.price !== null) data.price = ticket.price;
    if (ticket.numBag !== undefined && ticket.numBag !== null) data.numBag = ticket.numBag;

    if (Object.keys(data).length === 0) {
      alert("Modifica almeno un campo prima di salvare.");
      return;
    }

    this.ticketsService.updateTickets(ticket._code, data).subscribe({
      next: res => {
        console.log("Biglietto", res);

        const updatedTicket = res.ticket;
        const idx = this.tickets.findIndex(t => t._code === updatedTicket._code);
        if(idx !== -1){
          const currEditing = this.tickets[idx].editing;

          this.tickets[idx] = {
            ...updatedTicket,
            editing : currEditing
          };

        }
        this.loadTickets();
        this.updateTicketData = {seat:'', price:0, numBag:0};
      },
      error: err => {
        console.error("Errore aggiornamento biglietto", err);
        alert("Errore aggiornamento biglietto: " + err.error?.errormessage || err.message);
      }
    })
  }

  logout() {
    this.us.logout();
    this.router.navigate(['/search']);
  }
}




