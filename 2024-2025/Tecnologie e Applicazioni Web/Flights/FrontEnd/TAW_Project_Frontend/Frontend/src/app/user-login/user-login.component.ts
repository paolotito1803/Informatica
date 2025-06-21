import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public errmessage = undefined;
  constructor( private us: UserHttpService, private router: Router  ) { }

  ngOnInit() {
  }

  login(mail: string, password: string, remember: boolean) {

    this.us.login(mail, password, remember).subscribe({
      next: (d) => {
        if(this.us.is_passenger()){
          console.log('Login granted, calling router.navigate(/tickets)');
          this.errmessage = undefined;
          this.router.navigate(['/tickets']);
        }
        if(this.us.is_airline()){
          console.log('Login granted, calling router.navigate(/airlines)');
          this.errmessage = undefined;
          this.router.navigate(['/airlines']);
        }
        if(this.us.is_admin()){
          console.log('Login granted, calling router.navigate(/airlines)');
          this.errmessage = undefined;
          this.router.navigate(['/airlines']); // TODO inserire la pagina per l'inserimento compagnie aeree
        }
      },
      error: (err) => {
        console.log('Login error: ' + JSON.stringify(err));
        this.errmessage = err.message;
      }
    });

  }

}
