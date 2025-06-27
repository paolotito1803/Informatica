import { Component, OnInit } from '@angular/core';
import { Aircrafts, AircraftsService } from 'src/app/services/aircrafts.service';
import { AirlinesService } from 'src/app/services/airlines.service';
import { UserHttpService } from 'src/app/user-http.service';
import { Seats } from 'src/app/services/seats.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  setupData: any = { aircrafts: [] };
  updateData: any = { aircrafts: [] };
  mustChangePassword = false;
  showSetup = false;
  airlineName : string = '';
  airlineRevenue : number = 0;

  constructor( private aircraftsService: AircraftsService,
    private airlinesService: AirlinesService,
    private us: UserHttpService) {}

  ngOnInit() {
    const id = this.us.get_mail();
    this.airlinesService.getAirlineByMail(id).subscribe({
      next: (res: any) => {
        this.mustChangePassword = res.mustChangePassword;
        this.showSetup = this.mustChangePassword;
        if (res.aircrafts) this.updateData.aircrafts = res.aircrafts;
        if (res.name) this.airlineName = res.name;
        if (res.revenue) this.airlineRevenue = res.revenue;
      },
      error: err => console.error(err)
    });
  }



  switchToSetup() {
    this.showSetup = true;
  }

  switchToUpdate() {
    this.showSetup = false;
  }

  setupAirline() {
    const id = this.us.get_mail();
    this.airlinesService.setupAirline(id, this.setupData).subscribe({
      next: res => {
        console.log(res);
        this.mustChangePassword = false;
        this.showSetup = false;
      },
      error: err => console.error(err)
    });
  }

updateAirlines() {
  const mail = this.us.get_mail();

  const data: any = {};
  if (this.airlineName && this.airlineName.trim() !== '') {
    data.name = this.airlineName.trim();
  }
  if (this.airlineRevenue !== null && this.airlineRevenue !== undefined) {
    data.revenue = this.airlineRevenue;
  }
  if( this.updateData.aircrafts && this.updateData.aircrafts.length > 0) {
    data.aircrafts = this.updateData.aircrafts;
  }

  // Se non c'è nulla da aggiornare, non inviare la richiesta
  if (Object.keys(data).length === 0) {
    console.error('Nessun campo valido da aggiornare.');
    return;
  }

  this.airlinesService.updateAirlines(mail, data).subscribe({
    next: res => {
      console.log('Airline aggiornata:', res);
      if (res.name) this.airlineName = res.name;
      if (res.revenue !== undefined) this.airlineRevenue = res.revenue;
      this.mustChangePassword = false;
      this.showSetup = false;
    },
    error: err => console.error(err)
  });
}

updateInfo() {
  // Itera su tutti gli aerei presenti nel form
  for (const aircraft of this.updateData.aircrafts) {
    // Se non ha _id, è un nuovo aereo da salvare
    if (!(aircraft as any)._id) {
      this.addAircraftToBackend(aircraft); // salva nella collezione Aircrafts
      const id = this.us.get_mail();
      this.airlinesService.getAirlineByMail(id).subscribe(res => {
      this.updateData = res;
      });
    }
  }
  
}

  // Aircraft & seat management
  addSetupAircraft() { this.setupData.aircrafts.push({ _numAircraft:'', modello:'', seats:[] }); }
  removeSetupAircraft(i: number) { this.setupData.aircrafts.splice(i,1); }
  addSetupSeat(ai:number){
    this.setupData.aircrafts[ai].seats.push({ _numSeat:'', class:'', legroom:false, isFree:true });
  }
  removeSetupSeat(ai:number, si:number){ this.setupData.aircrafts[ai].seats.splice(si,1); }

  addAircraft() { this.updateData.aircrafts.push({ _numAircraft:'', modello:'', seats:[] }); }
  removeAircraft(i:number){ this.updateData.aircrafts.splice(i,1); }
  addSeat(ai:number){
    this.updateData.aircrafts[ai].seats.push({ _numSeat:'', class:'', legroom:false, isFree:true });
  }
  removeSeat(ai:number, si:number){ this.updateData.aircrafts[ai].seats.splice(si,1); }
  addAircraftToBackend(aircraft: Aircrafts) {
    this.aircraftsService.addAircraft(aircraft).subscribe({
      next: () => {
        console.log(`Aereo ${aircraft._numAircraft} salvato correttamente`);
      },
      error: err => {
        console.error("Errore salvataggio aereo:", err);
      }
    });
  }
}