import { Injectable } from '@angular/core';
import { Aircrafts } from './aircrafts.service';

export interface Airlines{
  _signature : string,
  name: string,
  revenue : number,
  mail : string,
  aircrafts : Aircrafts[],
  mustChangePassword: boolean,
  salt : string,
  digest : string,
}

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {

  constructor() { }
}
