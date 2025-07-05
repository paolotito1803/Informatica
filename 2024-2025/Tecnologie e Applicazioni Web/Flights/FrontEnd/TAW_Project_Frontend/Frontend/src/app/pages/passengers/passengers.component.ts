import { Component, OnInit } from '@angular/core';
import { Tickets, TicketsService } from 'src/app/services/tickets.service';
import { UserHttpService } from 'src/app/user-http.service';
import { PassangersService } from 'src/app/services/passangers.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  tickets: Tickets[] = [];
  newTicket: Partial<Tickets> | null = null; // form acquisto
  username = '';
  mail = '';

  editingUserData = false;
  editUsername = '';
  editMail = '';
  editPassword = '';
  editPassportID = '';

  constructor(
    private ticketsService: TicketsService,
    private passangersService: PassangersService,
    private us: UserHttpService
  ) {}

  ngOnInit() {
    this.mail = this.us.get_mail();
    this.username = this.us.get_username();
    
    this.ticketsService.getTickets().subscribe(res => {
      console.log('Biglietti ricevuti:', res); // Debug temporaneo
      //this.tickets = res;
      this.tickets = res.map(t => ({_code : t._code, user : this.us.get_mail(), 
                                    flight : t.flight, seat : t.seat, 
                                    price : t.price, numBag : t.numBag, editing: false}));
    });
  }

    startEdit() {
    this.editingUserData = true;
    this.editUsername = this.username;
    this.editMail = this.mail;
    this.editPassword = '';
    this.editPassportID = '';
  }

  cancelUpdate() {
    this.editingUserData = false;
    this.editUsername = '';
    this.editMail = '';
    this.editPassword = '';
    this.editPassportID = '';
  }

  updatePassangers() {
    const data: any = {};

    if (this.editUsername.trim() !== '') {
      data.username = this.editUsername;
    }

    if (this.editMail.trim() !== '') {
      data.mail = this.editMail;
    }

    if (this.editPassword.trim() !== '') {
      data.password = this.editPassword;
    }

    if (this.editPassportID.trim() !== '') {
      data.passportID = this.editPassportID;
    }

    this.passangersService.updatePassangers(this.us.get_id(), data).subscribe({
      next: () => {
        console.log('Dati passeggero aggiornati correttamente.');
        this.username = this.editUsername;
        this.mail = this.editMail;
        this.editingUserData = false; // esci dalla modalità modifica
      },
      error: err => {
        console.error('Errore aggiornamento dati passeggero:', err);
      }
    });

    // Salva nuovi biglietti (se non hanno _id)
    for (const ticket of this.tickets) {
      if (!(ticket as any)._id) {
        this.addPassangersTicketToBackend(ticket);
      }
    }
  }

  // Ticket management
  addPassangersTicket() {
    this.tickets.push({ _code : '', user : '', flight: '', seat: '', price: 0, numBag: 0 });
  }

  removePassangersTicket(i: number) {
    const removed = this.tickets.splice(i, 1)[0];
    if (removed && removed._code) {
      this.deletePassangersTicketFromBackend(removed._code);
    }
  }

  addPassangersTicketToBackend(ticket: Tickets) {
    this.ticketsService.addTickets(ticket).subscribe({
      next: res => {
        console.log(`Biglietto per volo ${ticket.flight} aggiunto con ID ${res.id}`);
      },
      error: err => {
        console.error('Errore salvataggio biglietto:', err);
      }
    });
  }

  deletePassangersTicketFromBackend(id: string) {
    this.ticketsService.deleteTickets(id).subscribe({
      next: () => {
        console.log(`Biglietto ${id} eliminato correttamente`);
      },
      error: err => {
        console.error('Errore eliminazione biglietto:', err);
      }
    });
  }

  deletePassangers() {
    if (confirm('Sei sicuro di voler eliminare definitivamente il tuo account e tutti i dati associati?')) {
      this.passangersService.deletePassangers(this.us.get_id()).subscribe({
        next: () => {
          console.log(`Passeggero ${this.mail} eliminato correttamente.`);
          // Puoi reindirizzare alla pagina di login o home
          window.location.href = '/';
        },
        error: err => {
          console.error('Errore durante l\'eliminazione del passeggero:', err);
        }
      });
    }
  }

  acquistaBiglietto() {
    if (!this.newTicket) return;

    // Assicurati che i campi essenziali siano compilati
    if (!this.newTicket.flight || !this.newTicket.seat || !this.newTicket.price) {
      alert('Compila tutti i campi necessari!');
      return;
    }

    this.ticketsService.addTickets(this.newTicket as any).subscribe({
      next: () => {
        alert('Biglietto acquistato con successo!');
        this.newTicket = null;
        this.ticketsService.getTickets().subscribe({
          next: (data) => this.tickets = data,
          error: (err) => console.error(err)
        });;
      },
      error: (err) => {
        console.error(err);
        alert('Errore durante l\'acquisto del biglietto.');
      }
    });
  }

  deleteTickets(ticket: Tickets) {
    this.ticketsService.deleteTickets(ticket._code).subscribe({
      next: () => this.ticketsService.getTickets().subscribe({
        next: (data) => this.tickets = data,
        error: (err) => console.error(err)
      }),
      error: (err) => console.error(err)
    });
  }
}