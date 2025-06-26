import { Injectable } from '@angular/core';

export interface Tickets{
  readonly _code : string,
  user :string,
  seat : string,
  flight : string,
  price : number,
  numBag : number
}

@Injectable({
  providedIn: 'root'
})


export class TicketsService {

  constructor() { }
}
