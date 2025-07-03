import { Component } from '@angular/core';
//import { Flights } from 'src/app/models/flights.interface';
import { FlightsService, Flights } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  flights: Flights[] = [];
  newFlight: Partial<Flights> = {};
  editedFlight: Flights | null = null;

  constructor(private flightsService: FlightsService) {
    this.loadFlights();
  }

  loadFlights() {
    this.flightsService.getFlights().subscribe(flights => {
      this.flights = flights;
    });
  }

  addFlight() {
    if (!this.newFlight._flightCode || !this.newFlight.route || !this.newFlight.aircraft || !this.newFlight.duration || !this.newFlight.dataOra) {
      alert('Please fill all fields.');
      return;
    }

    const flight: Flights = {
      _flightCode: this.newFlight._flightCode,
      route: this.newFlight.route,
      aircraft: this.newFlight.aircraft,
      duration: this.newFlight.duration,
      dataOra: new Date(this.newFlight.dataOra).toISOString()
    };

    this.flightsService.addFlights(flight).subscribe(() => {
      this.loadFlights();
      this.newFlight = {};
    });
  }

  editFlight(flight: Flights) {
    this.editedFlight = { ...flight };
  }

  saveFlightChanges() {
    if (this.editedFlight) {
      const updatedFlight: Flights = {
        ...this.editedFlight,
        dataOra: new Date(this.editedFlight.dataOra).toISOString()
      };

      this.flightsService.updateFlights(updatedFlight._flightCode, updatedFlight).subscribe(() => {
        this.loadFlights();
        this.editedFlight = null;
      });
    }
  }

  cancelEdit() {
    this.editedFlight = null;
  }

  deleteFlight(flightCode: string) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightsService.deleteFlights(flightCode).subscribe(() => {
        this.loadFlights();
      });
    }
  }
}