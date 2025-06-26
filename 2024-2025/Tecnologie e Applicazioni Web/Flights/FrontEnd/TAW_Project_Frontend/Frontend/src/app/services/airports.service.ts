import { Injectable } from '@angular/core';

export interface Airports{
  _code : string,
  name: string,
  city : string
}
@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  constructor() { }
}
