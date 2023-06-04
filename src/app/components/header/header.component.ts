import { Component, OnInit } from '@angular/core';

import { MainService } from 'src/app/services/main.service';

import { IUser } from 'src/app/interfaces/main';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public inState: boolean = false;
  public upState: boolean = false;
  public addState: boolean = false;
  public currentUser: IUser | null = null;
  public currentUserName: string = '';
  public logged: boolean = false;
  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.currentUser = this.service.currentUser;
    this.logged = this.service.userLogged;
  }
  showModal(type?: boolean): void {
    if (type) {
      this.inState = !this.inState;
    } else if (type === false) {
      this.upState = !this.upState;
    } else {
      this.addState = !this.addState;
    }
    this.update();
  }
  update(): void {
    if (this.logged !== this.service.userLogged) {
      this.logged = this.service.userLogged;
      this.currentUser = this.service.currentUser;
      if (this.currentUser) {
        this.currentUserName = this.currentUser.userName;
      } else {
        this.currentUserName = '';
      }
    }
  }
  logOut(): void{
    this.service.logOut();
    this.update();
  }
}
