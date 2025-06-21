import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Flight {
  _id: string;
  dataOra: string;
  duration: number;
  // aggiungi altri campi se serve
}

export interface LayoverConnection {
  layover: string;
  firstLeg: Flight;
  secondLeg: Flight;
}

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  constructor(private http: HttpClient) { }

  searchFlights(depart: string, destination: string): Observable<Flight[] | LayoverConnection[]> {
    let params = new HttpParams()
      .set('depart', depart)
      .set('destination', destination);

    return this.http.get<Flight[] | LayoverConnection[]>('/search', { params });
  }
}
