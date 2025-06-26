import { Injectable } from '@angular/core';


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

  constructor() { }
}
