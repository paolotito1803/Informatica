import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserHttpService } from '../user-http.service';
import { Seats } from './seats.service';


export interface Aircrafts {
  _numAircraft: string;
  modello: string;
  seats: Seats[];
}

@Injectable({
  providedIn: 'root'
})
export class AircraftsService {

  constructor(private http: HttpClient, private us: UserHttpService) {}

  addAircraft(aircraft: Aircrafts): Observable<any> {
    return this.http.post(this.us.url + '/aircrafts', aircraft, {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'Content-Type': 'application/json'
      })
    });
  }

  deleteAircraft(id: string) : Observable<any> {
    return this.http.delete(this.us.url + "/aircrafts/" + id, {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'Content-Type': 'application/json'
      })
    });
  }

  updateAircraft(id: string, data: {_numAircraft: string, modello: string, seats: Seats[], editing: boolean}) : Observable<any> {
    return this.http.put(this.us.url + "/aircrafts/" + id, data,{
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'Content-Type': 'application/json'
      })
    });
  }
}
