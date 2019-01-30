import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../../api/authentification.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connected: boolean = false;

  constructor(
    private authenticationService: AuthenticationService) {
    this.authenticationService.connectedState
      .subscribe((status) => this.connected = status);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
