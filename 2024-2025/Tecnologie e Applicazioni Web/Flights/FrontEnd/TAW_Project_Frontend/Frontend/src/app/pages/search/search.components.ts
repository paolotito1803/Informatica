import { Component } from '@angular/core';
import { FlightSearchService, Flight, LayoverConnection } from '../../services/search.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  depart: string = '';
  destination: string = '';

  loading = false;
  errorMessage = '';

  directFlights: Flight[] = [];
  layoverConnections: LayoverConnection[] = [];

  constructor(private flightSearchService: FlightSearchService) {}

  search() {
    this.errorMessage = '';
    this.loading = true;
    this.directFlights = [];
    this.layoverConnections = [];

    this.flightSearchService.searchFlights(this.depart, this.destination).subscribe({
      next: (data) => {
        this.loading = false;
        if (data.length === 0) {
          this.errorMessage = 'Nessun volo trovato.';
          return;
        }
        // Capire se sono voli diretti (Flight[]) o con scalo (LayoverConnection[])
        if ('firstLeg' in data[0]) {
          // sono connessioni con scalo
          this.layoverConnections = data as LayoverConnection[];
        } else {
          // voli diretti
          this.directFlights = data as Flight[];
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.errormessage || 'Errore durante la ricerca voli.';
      }
    });
  }
}
