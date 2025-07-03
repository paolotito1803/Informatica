import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

interface Airport {
  _code: string;
  name: string;
  city: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  inviteForm!: FormGroup;
  airportForm!: FormGroup;

  airports: Airport[] = [];
  editing: { [id: string]: boolean } = {};
  editBuffer: { [id: string]: Airport } = {};

  constructor(private fb: FormBuilder, private adminSvc: AdminService) {}

  ngOnInit(): void {
    /*
      data: { 
                        _signature: string,
                        username: string, 
                        name: string, 
                        mail: string, 
                        password: string,
                        passportID: string,
                        roles: 'airline',
                      }
    */
    this.inviteForm = this.fb.group({
      _signature: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      passportID: ['', Validators.required],
      roles: 'airline'
    });

    this.airportForm = this.fb.group({
      _code: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required]
    });
    
    this.loadAirports();
  }

  // ✉️ Invita compagnia
  inviteCompany(): void {
    if (this.inviteForm.invalid) return;
    this.adminSvc.inviteCompany(this.inviteForm.value).subscribe({
      next: res => {
        alert(`Invito inviato a ${this.inviteForm.value.mail} con password temporanea: ${this.inviteForm.value.password}`);
        this.inviteForm.reset();
      },
      error: err => alert('Errore invio invito: ' + err.message)
    });
  }

  // 🛫 CRUD aeroporti
  loadAirports(): void {
    this.adminSvc.getAirports().subscribe({
      next: list => this.airports = list,
      error: err => console.error(err)
    });
  }

  addAirport(): void {
    if (this.airportForm.invalid) return;
    this.adminSvc.addAirport(this.airportForm.value).subscribe({
      next: a => {
        this.airports.push(a);
        this.airportForm.reset();
      },
      error: err => alert('Errore creazione aeroporto')
    });
  }

  startEdit(a: Airport): void {
    this.editing[a._code] = true;
    this.editBuffer[a._code] = { ...a };
  }

  saveEdit(id: string): void {
    const data = this.editBuffer[id];
    this.adminSvc.updateAirport(id, data).subscribe({
      next: updated => {
        const idx = this.airports.findIndex(a => a._code === id);
        if (idx > -1) this.airports[idx] = updated;
        this.cancelEdit(id);
      },
      error: err => alert('Errore aggiornamento aeroporto')
    });
  }

  cancelEdit(id: string): void {
    delete this.editing[id];
    delete this.editBuffer[id];
  }

  deleteAirport(id: string): void {
    this.adminSvc.deleteAirport(id).subscribe({
      next: () => this.airports = this.airports.filter(a => a._code !== id),
      error: err => alert('Errore eliminazione aeroporto')
    });
  }
}
