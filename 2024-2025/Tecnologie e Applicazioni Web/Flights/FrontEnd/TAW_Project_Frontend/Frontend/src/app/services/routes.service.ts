import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserHttpService } from '../user-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


export interface Routes{
  _id :string,
  destination : string,
  departure : string,
  layoverFuel: string[]
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
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

  addRoute(route: Routes): Observable<any> {
    return this.http.post(this.us.url + '/routes', route, {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'Content-Type': 'application/json'
      })
    });
  }

  editRoute(id: string, data: any) :Observable<any>{
    return this.http.put(this.us.url+'/routes/'+id, data, this.create_options())
    .pipe(catchError(this.handleError))
  }

  deleteRoute(id: string): Observable<any>{
    return this.http.delete(this.us.url+'/routes/'+id, this.create_options())
    .pipe(catchError(this.handleError))
  }

  getRoutes(): Observable<any>{
    return this.http.get(this.us.url+'/routes', this.create_options())
    .pipe(catchError(this.handleError))
  }
}
