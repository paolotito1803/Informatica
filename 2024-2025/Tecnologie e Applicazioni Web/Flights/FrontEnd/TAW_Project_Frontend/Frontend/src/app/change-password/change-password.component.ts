import { Component } from '@angular/core';
import { AirlinesService } from 'src/app/services/airlines.service';
import { UserHttpService } from 'src/app/user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'] 
})
export class ChangePasswordComponent {
  password = '';
  confirmPassword = '';
  error = '';

  constructor(
    private airlinesService: AirlinesService,
    private us: UserHttpService,
    private router: Router
  ) {}

  changePassword() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Le password non coincidono';
      return;
    }

    const mail = this.us.get_mail();

    this.airlinesService.setupAirline(mail, { password: this.password }).subscribe({
      next: () => {
        alert('Password cambiata con successo!');
        // Dopo il cambio password, vai alla dashboard normale
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = 'Errore durante il cambio password';
        console.error(err);
      }
    });
  }
}
