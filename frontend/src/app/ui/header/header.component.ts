import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../../api/authentification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connected = false;

  constructor(
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') !== null) {
      this.connected = true;
    }
  }

  logout() {
    console.log("LOGOUT");
    this.authenticationService.logout();

  }

}
