import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightSearchService, Flight, LayoverConnection } from '../../services/search.service';
import { Route } from '@angular/router';
import { Tickets } from 'src/app/services/tickets.service';

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

  results : any[] = [];

  directFlights: Flight[] = [];
  layoverConnections: LayoverConnection[] = [];

  constructor(private flightSearchService: FlightSearchService) {}

  search(/*depart: string, destination: string*/) {
    this.errorMessage = ''; 
    this.loading = true;
    this.directFlights = [];
    this.layoverConnections = [];

    this.flightSearchService.searchFlights(this.depart, this.destination).subscribe({
      next: (results) => {
        console.log("Ricerca avvenuta");
        this.results = results.sort((a,b) => {
          if (a.cost !== b.cost) 
            return a.cost - b.cost;
          return a.duration - b.duration;
        });
        this.loading = false;
        /*if (data.length === 0) {
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
        }*/
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.errormessage || 'Errore durante la ricerca voli.';
      }
    });
  }
}
