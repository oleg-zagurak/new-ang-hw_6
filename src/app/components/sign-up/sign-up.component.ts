import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Input() opened: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  public email: string = '';
  public password: string = '';
  public name: string = '';
  constructor(private service: MainService) { }

  ngOnInit(): void {
  }
  closing(): void{
    this.opened = false;
    this.clear()
    this.close.emit()
  }
  register(){
    this.service.register(this.name, this.email, this.password);
    this.closing();
  }
  private clear(){
    this.password = this.email = this.name = '';
  }
}
