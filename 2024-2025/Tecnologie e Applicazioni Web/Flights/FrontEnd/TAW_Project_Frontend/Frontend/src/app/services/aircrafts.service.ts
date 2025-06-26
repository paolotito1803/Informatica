import { Injectable } from '@angular/core';
import { Seats } from "../services/seats.service";

export interface Aircrafts{
  _numAircraft : string,
  seats : Seats[],
  modello : string
}


@Injectable({
  providedIn: 'root'
})
export class AircraftsService {

  constructor() { }
}
