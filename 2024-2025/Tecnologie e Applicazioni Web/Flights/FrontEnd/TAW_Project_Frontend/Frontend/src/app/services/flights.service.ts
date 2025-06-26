import { Injectable } from '@angular/core';

export interface Flights {
  _flightcode: string;
  route: string; // ObjectId
  aircraft: string;
  duration: number;
  dataOra : string
}


@Injectable({
  providedIn: 'root'
})


export class FlightsService {

  constructor() { }
}
