import { Component } from '@angular/core';
import { UserHttpService } from 'src/app/user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  adminRole : boolean = false;
  airlineRole : boolean = false;
  passengerRole : boolean = false;

  constructor(private us: UserHttpService, private router: Router){}

  ngOnInit() : void{
    this.adminRole = this.us.is_admin();
    this.airlineRole = this.us.is_airline();
    this.passengerRole = this.us.is_passenger();
  }

  logout(){
    this.us.logout();
    this.router.navigate(['/search']);
  }
}
