import { Injectable } from '@angular/core';
import { Aircrafts } from './aircrafts.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserHttpService } from '../user-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Airlines{
  _signature : string,
  name: string,
  revenue : number,
  mail : string,
  aircrafts : Aircrafts[],
  mustChangePassword: boolean,
  salt : string,
  digest : string,
}

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {

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

  private create_options( params = {} ) {
    return  {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'cache-control': 'no-cache',
        'Content-Type':  'application/json',
      }),
      params: new HttpParams( {fromObject: params} )
    };

  }
    
  updateAirlines(id : string, data: {name?: string, revenue?: number}) : Observable<any>{
    return this.http.put(this.us.url + '/airlines/'+ id, data, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  setupAirline(id: string, data: {
    password?: string,
    name?: string,
    mail?: string,
    aircrafts?: Aircrafts[]
  }): Observable<any> {
    return this.http.put(this.us.url + '/airlines/' + id + '/setup', data, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  getAirlineByMail(mail : string) : Observable<Airlines>{
    return this.http.get<Airlines>(this.us.url + '/airlines/' + mail, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  getAircraftByMail(mail : string) : Observable<Aircrafts[]>{
    return this.http.get<Aircrafts[]>(this.us.url + '/airlines/' + mail + '/aircrafts', this.create_options()).pipe(
      catchError(this.handleError)
    );
  }

  getAllAirlines() : Observable<Airlines[]>{
    return this.http.get<Airlines[]>(this.us.url + '/airlines', this.create_options()).pipe(
      catchError(this.handleError));
  }
}
