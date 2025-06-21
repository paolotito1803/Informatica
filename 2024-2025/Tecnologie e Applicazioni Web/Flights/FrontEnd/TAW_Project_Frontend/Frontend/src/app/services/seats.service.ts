import { Injectable } from '@angular/core';

export interface Seats {
  _numSeat : string,
  class : string,
  legroom : boolean,
  isFree : boolean
}


@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor() { }
}
