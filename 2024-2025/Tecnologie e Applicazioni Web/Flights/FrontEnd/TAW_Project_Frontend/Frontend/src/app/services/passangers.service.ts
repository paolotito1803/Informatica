import { Injectable } from '@angular/core';
import { UserHttpService } from '../user-http.service';
import { Tickets } from './tickets.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface User { 
  mail:string,
  password:string, 
  username:string,
  roles:string,
  passportID:string,
  tickets: Tickets[]
};

@Injectable({
  providedIn: 'root'
})
export class PassangersService {

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

    updatePassangers(id: string, data: {name?: string, mail?: string, password?: string, passportID?: string}) : Observable<any> {
      return this.http.put(this.us.url + '/users/' + id, data, this.create_options()).pipe(catchError(this.handleError));
    }

   deletePassangers(id: string): Observable<any> {
    return this.http.delete(this.us.url + `/users/` + id, this.create_options()).pipe(catchError(this.handleError));
  }
}
