import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from '../user-http.service';
import { catchError, Observable, throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';

export interface Tickets {
 _code: string;
  user: string;
  seat: string;
  flight: string;
  price: number;
  numBag: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

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

  // Metodo corretto e generico, chiama il backend autenticato
  getTickets(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(this.us.url + '/tickets', this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  deleteTickets(id : string): Observable<any> {
    return this.http.delete(this.us.url + '/tickets/' + id, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  addTickets(ticketData: { flight: string, seat: string, price: number, numBag: number }): Observable<any> {
    return this.http.post(this.us.url + '/tickets', ticketData, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  updateTickets(id: string, data:{seat? : string, price?:number, numBag?:number}) : Observable<{error: boolean, errormessage: string, ticket:Tickets}>{
    return this.http.put<{error: boolean, errormessage: string, ticket:Tickets}>(this.us.url + "/tickets/" + id, data, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

}
