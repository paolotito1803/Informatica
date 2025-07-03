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

    this.flightSearchService.searchFlights(this.depart, this.destination).subscribe({
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

  acquistaVolo(flight: FlightInfo) {
    const ticketData = {
      flight: flight._id,
      seat: '', // Selezione seat successivamente o gestione automatica
      price: flight.price || 0,
      numBag: 0 // Predefinito, potrai modificarlo con input utente
    };

    const token = this.us.get_token();

    if(!token){
      localStorage.setItem('pendingTicket', JSON.stringify(ticketData));
      this.router.navigate(['/login']);
      return;
    }

    if(this.us.is_passenger()){
      console.log("Arrivato");
      this.ticketsService.addTickets(ticketData).subscribe({
        next: () => {
          alert('Biglietto acquistato con successo!');
        },
        error: (err) => {
          console.error('Errore acquisto biglietto:', err);
          alert('Errore durante l\'acquisto del biglietto.');
        }
      });
    }
  }

  acquistaEntrambiVoli(conn: LayoverConnection) {
    const firstTicket = {
      flight: conn.firstLeg._id,
      seat: '',
      price: conn.firstLeg.price || 0,
      numBag: 0
    };

    const secondTicket = {
      flight: conn.secondLeg._id,
      seat: '',
      price: conn.secondLeg.price || 0,
      numBag: 0
    };

    const token = this.us.get_token();

    if(!token){
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
