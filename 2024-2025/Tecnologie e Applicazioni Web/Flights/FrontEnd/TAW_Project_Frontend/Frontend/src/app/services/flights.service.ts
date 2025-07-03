import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserHttpService } from '../user-http.service';

export interface Flights {
  _flightCode: string;
  route: string; // ObjectId
  aircraft: string;
  duration: number;
  dataOra: string; // ISO string
}



@Injectable({
  providedIn: 'root'
})


export class FlightsService {

  constructor(private http: HttpClient, private us: UserHttpService) {}
  
  private handleError(error: HttpErrorResponse) {
    console.error('Errore HTTP:', error);
    return throwError(() => new Error('Errore nella richiesta dei biglietti.'));
  }

  private create_options(params = {}) {
    return {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({ fromObject: params })
    };
  }
  
  addFlights(flightData : {_flightCode: string, route: string, aircraft: string, duration: number, dataOra: string}): Observable<any> {
    return this.http.post(this.us.url + '/flights', flightData, this.create_options()).pipe(catchError(this.handleError));
  }

  getFlights(): Observable<Flights[]> {
    return this.http.get<Flights[]>(this.us.url + '/flights', this.create_options()).pipe(catchError(this.handleError));
  }

  deleteFlights(id : string) : Observable<any> {
    return this.http.delete(this.us.url + '/flights/' + id, this.create_options()).pipe(catchError(this.handleError));
  }

  updateFlights(id: string, flightData : {_flightCode: string, route: string, aircraft: string, duration: number, dataOra: string}) : Observable<any> {
    return this.http.put(this.us.url + '/flights/' + id, flightData, this.create_options()).pipe(catchError(this.handleError));
  }
}