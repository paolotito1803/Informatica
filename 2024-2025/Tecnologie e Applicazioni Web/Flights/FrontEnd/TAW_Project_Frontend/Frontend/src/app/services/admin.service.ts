import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserHttpService } from '../user-http.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient, private us: UserHttpService) {}
  private createOptions() {
    return {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'Content-Type': 'application/json'
      })
    };
  }
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
  inviteCompany(data: { 
                        _signature: string,
                        username: string, 
                        name: string, 
                        mail: string, 
                        password: string,
                        passportID: string,
                        roles: 'airline',
                      }) : Observable<any>{
    return this.http.post(this.us.url + '/users', data, this.createOptions())
    .pipe(catchError(this.handleError));
  }

  getAirports() : Observable<any>{
    return this.http.get(this.us.url + '/airports', this.createOptions())
    .pipe(catchError(this.handleError));
  }

  addAirport(data: any): Observable<any> {
    return this.http.post(this.us.url + '/airports', data, this.createOptions())
    .pipe(catchError(this.handleError));
  }

  updateAirport(id: string, data: any): Observable<any> {
    return this.http.put(this.us.url + '/airports/' + id, data, this.createOptions())
    .pipe(catchError(this.handleError));
  }

  deleteAirport(id: string): Observable<any> {
    return this.http.delete(this.us.url + '/airports/' + id, this.createOptions())
    .pipe(catchError(this.handleError));
  }

  deleteAirline(id:string): Observable<any> {
    return this.http.delete(this.us.url + "/airlines/" + id, this.createOptions())
    .pipe(catchError(this.handleError));
  }
}
