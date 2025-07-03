import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../user-http.service';
import { Router } from '@angular/router';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public errmessage = undefined;
  constructor( private us: UserHttpService, private router: Router, private ticketsService : TicketsService ) { }

  ngOnInit() {
  }

  login(mail: string, password: string, remember: boolean) {

    this.us.login(mail, password, remember).subscribe({
      next: (d) => {
        if(this.us.is_passenger()){
          const pending = localStorage.getItem('pendingTicket');
          if (pending) {
            const ticketData = JSON.parse(pending);
            this.ticketsService.addTickets(ticketData).subscribe({
              next: () => {
                alert('Biglietto acquistato con successo dopo login!');
                localStorage.removeItem('pendingTicket');
                this.router.navigate(['/dashboard']);
              },
              error: (err) => {
                console.error('Errore post-login:', err);
                this.router.navigate(['/dashboard']); // Naviga comunque
              }
            });
        } else {
          console.log('Login granted, calling router.navigate(/tickets)');
          this.errmessage = undefined;
          this.router.navigate(['/dashboard']);
        }
      }
      if(this.us.is_airline()){
        console.log('Login granted, calling router.navigate(/airlines)');
        this.errmessage = undefined;
        this.router.navigate(['/dashboard']);
      }
      if(this.us.is_admin()){
        console.log('Login granted, calling router.navigate(/airlines)');
        this.errmessage = undefined;
        this.router.navigate(['/dashboard']); // TODO inserire la pagina per l'inserimento compagnie aeree
      }
    },
    error: (err) => {
      console.log('Login error: ' + JSON.stringify(err));
      this.errmessage = err.message;
    }
  });
  }
}
