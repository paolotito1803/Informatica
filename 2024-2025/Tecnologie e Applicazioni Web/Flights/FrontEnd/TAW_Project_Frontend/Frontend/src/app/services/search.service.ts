import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserHttpService } from '../user-http.service';

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

  constructor(private http: HttpClient, private us : UserHttpService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        'body was: ' + JSON.stringify(error.error));
    }

    return throwError(() => new Error('Something bad happened; please try again later.') );
  }


  searchFlights(depart: string, destination: string): Observable<any[]/*Flight[] | LayoverConnection[]*/> {
    let params = new HttpParams()
      .set('depart', depart)
      .set('destination', destination);

    return this.http.get<any[]/*Flight[] | LayoverConnection[]*/>(this.us.url + '/search', { params }).pipe(
      catchError(this.handleError)
    );
  }
}
