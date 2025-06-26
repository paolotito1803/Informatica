import { Component} from '@angular/core';
import { Aircrafts } from 'src/app/services/aircrafts.service';
import { AirlinesService} from 'src/app/services/airlines.service';
import { UserHttpService } from 'src/app/user-http.service';
import { Seats } from 'src/app/services/seats.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})

export class AirlinesComponent {
  nome : string = "";
  revenue : number = 0;
  aircraft : Aircrafts[] = [];
  mail : string = "";
  password : string = "";
  setupData : any = {};
  updateData : any = {};
  
  constructor(private airlinesService : AirlinesService, private us : UserHttpService){}

  
  updateInfo(){
    const id = this.us.get_mail();
    this.updateData = {
      name: this.nome,
      revenue: this.revenue,
      aircrafts: this.aircraft
    };

    this.airlinesService.updateAirlines(id,this.updateData).subscribe({
      next : (res) => {
        console.log('Aggiornato con successo', res);
      },
      error : (err) => {
        console.error('Errore aggiornamento', err);
      }
    })
  }

  setupAirline() {
    const id = this.us.get_mail();
    this.setupData = {
      password: this.password,
      name: this.nome,
      mail: this.mail,
      aircrafts: this.aircraft
    };

    this.airlinesService.setupAirline(id, this.setupData).subscribe({
      next: res => console.log('Setup completato', res),
      error: err => console.error('Errore setup:', err)
    });
  }

  addAircraft() {
    const newAircraft: Aircrafts = {
      _numAircraft: '',
      modello: '',
      seats: []
    };
    this.updateData.aircrafts?.push(newAircraft);
  }

  removeAircraft(index: number) {
    this.updateData.aircrafts?.splice(index, 1);
  }

  addSeat(aircraftIndex: number) {
    const newSeat: Seats = {
      _numSeat: '',
      class: '',
      legroom: false,
      isFree: true
    };
    this.updateData.aircrafts?.[aircraftIndex].seats.push(newSeat);
  }

  removeSeat(aircraftIndex: number, seatIndex: number) {
    this.updateData.aircrafts?.[aircraftIndex].seats.splice(seatIndex, 1);
  }

  // Aggiunta / rimozione aerei per setup
  addSetupAircraft() {
    this.setupData.aircrafts.push({
      _numAircraft: '',
      modello: '',
      seats: []
    });
  }

  removeSetupAircraft(index: number) {
    this.setupData.aircrafts.splice(index, 1);
  }

  addSetupSeat(aircraftIndex: number) {
    this.setupData.aircrafts[aircraftIndex].seats.push({
      _numSeat: '',
      class: '',
      legroom: false,
      isFree: true
    });
  }

  removeSetupSeat(aircraftIndex: number, seatIndex: number) {
    this.setupData.aircrafts[aircraftIndex].seats.splice(seatIndex, 1);
  }
}
