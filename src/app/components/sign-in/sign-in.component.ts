import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input() opened: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  public email: string = '';
  public password: string = '';
  constructor(private service: MainService) { }

  ngOnInit(): void {
  }
  closing(): void{
    this.opened = false;
    this.clear();
    this.close.emit()
  }
  signIn(){
    this.service.authorize(this.email, this.password);
    this.closing();
  }
  private clear(){
    this.password = this.email = '';
  }
}
