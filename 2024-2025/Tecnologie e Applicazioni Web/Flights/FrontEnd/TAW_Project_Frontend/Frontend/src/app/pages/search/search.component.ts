import { Component } from '@angular/core';
import { FlightSearchService, LayoverConnection, FlightInfo } from '../../services/search.service';

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

  constructor(private flightSearchService: FlightSearchService) {}

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
}
