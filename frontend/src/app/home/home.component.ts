import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.username)
  }

  ngOnInit() {
  }
}
