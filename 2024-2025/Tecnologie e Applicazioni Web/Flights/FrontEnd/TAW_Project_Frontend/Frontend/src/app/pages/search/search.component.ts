import { Component } from '@angular/core';
import { FlightSearchService, LayoverConnection, FlightInfo } from '../../services/search.service';
import { TicketsService } from '../../services/tickets.service'; // Assicurati di avere questo service!
import { UserHttpService } from '../../user-http.service'; // Per recuperare il token se serve
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class FlightSearchComponent {
  depart: string = '';
  destination: string = '';
  dataOra: string = '';
  

  loading = false;
  errorMessage = '';

  directFlights: FlightInfo[] = [];
  layoverConnections: LayoverConnection[] = [];

  constructor( private flightSearchService: FlightSearchService,
    private ticketsService: TicketsService,
    private us: UserHttpService,
    private router: Router) {}

  search() {
    this.errorMessage = ''; 
    this.loading = true;
    this.directFlights = [];
    this.layoverConnections = [];

    this.flightSearchService.searchFlights(this.depart, this.destination, this.dataOra).subscribe({
      next: (results) => {
        console.log("Ricerca avvenuta");
        this.loading = false;
        if(results.length === 0){
          this.errorMessage = 'Nessun volo trovato';
          return;
        }

        if ('firstLeg' in results[0]) {
        // Sono connessioni con scalo
          this.layoverConnections = results as LayoverConnection[];
        } else {
          // Sono voli diretti
          this.directFlights = results as FlightInfo[];
        } 
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.errormessage || 'Errore durante la ricerca voli.';
      }
    });
  }

  getSeatPrice(seat: any): number {
    if (!seat || !seat.class) return 0;

    const cls = seat.class.toLowerCase();
    if (cls.includes('economy')) return 10;
    if (cls.includes('business')) return 30;
    if (cls.includes('first')) return 50;

    return 20; // default
  }

  acquistaVolo(flight: FlightInfo, seat: any) {
    console.log("Acquisto volo, ID:", flight.flightCode, "Oggetto:", flight);

    if (!seat || !seat._numSeat) {
      alert('Dati del posto non validi.');
      return;
    }

    const ticketData = {
      flight: flight.flightCode,
      seat: seat._numSeat || '',
      price: this.getSeatPrice(seat) || 0,
      numBag: 0
    };

    const token = this.us.get_token();
    console.log("[DEBUG] Token presente?", !!token);
    if (!token) {
      localStorage.setItem('pendingTicket', JSON.stringify(ticketData));
      console.log("Salvato pendingTicket:", ticketData);
      this.router.navigate(['/login']);
      return;
    }
    console.log("[DEBUG] Ticket diretto, pronto al post:", ticketData);
    if (this.us.is_passenger()) {
      this.ticketsService.addTickets(ticketData).subscribe({
        next: (res) => {
          console.log("Biglietto acquistato per volo ID:", ticketData.flight, "Response:", res);
          alert('Biglietto acquistato con successo!');
        },
        error: (err) => {
          console.error('Errore acquisto biglietto:', err);
          alert('Errore durante l\'acquisto del biglietto.');
        }
      });
    }
  }
  acquistaEntrambiVoli(conn: LayoverConnection, seat1 : any, seat2: any) {
    if (!seat1?._numSeat || !seat2?._numSeat) {
      alert('Posti non validi.');
      return;
    }
    const firstTicket = {
      flight: conn.firstLeg.flightCode,
      seat: seat1._numSeat || '',
      price: conn.firstLeg.price || 0,
      numBag: 0
    };

    const secondTicket = {
      flight: conn.secondLeg.flightCode,
      seat: seat2._numSeat || '',
      price: conn.secondLeg.price || 0,
      numBag: 0
    };
    console.log("[DEBUG] Acquisto con scalo - firstTicket:", firstTicket);
    console.log("[DEBUG] Acquisto con scalo - secondTicket:", secondTicket);
    const token = this.us.get_token();

    if(!token){
      localStorage.setItem('pendingLayoverTickets', JSON.stringify([firstTicket, secondTicket]));
      console.log("[DEBUG] pendingLayoverTickets salvati:", [firstTicket, secondTicket]);
      this.router.navigate(['/login']);
      return;
    }

    if(this.us.is_passenger()){
      console.log("Arrivato");
        this.ticketsService.addTickets(firstTicket).subscribe({
        next: () => {
          this.ticketsService.addTickets(secondTicket).subscribe({
            next: () => {
              alert('Entrambi i voli acquistati con successo!');
            },
            error: (err) => {
              console.error('Errore durante l\'acquisto del secondo volo:', err);
              alert('Primo volo acquistato, ma errore sul secondo.');
            }
          });
        },
        error: (err) => {
          console.error('Errore durante l\'acquisto del primo volo:', err);
          alert('Errore durante l\'acquisto del primo volo.');
        }
      });
    }
  }
}
