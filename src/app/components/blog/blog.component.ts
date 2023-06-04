import { Component, DoCheck, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, DoCheck {
  @Input() opened: boolean = false;
  @Input() editable: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  public title: string = '';
  public post: string = '';
  public edit: string = 'Edit post';
  public add: string = 'Add post';
  public editStatus: boolean = false;
  constructor(private service: MainService) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if(this.editable && !this.editStatus && this.service.getBlog(this.service.id)){
      let blog = this.service.getBlog(this.service.id);
      if(blog){
        this.title = blog.topic;
        this.post = blog.message;
        this.editStatus = true;
      }
    }
  }
  closing(): void{
    this.opened = false;
    this.clear();
    this.editStatus = false;
    this.service.id = 0;
    this.close.emit()
  }
  private clear(){
    this.title = this.post = '';
  }
  postBlog(type: boolean): void{
    if(type){
      this.addBlog()
    } else {
      this.editBlog()
    }
    this.closing()
  }
  private addBlog(): void{
    this.service.addBlog(this.title, this.post);
  }
  private editBlog(): void{
    this.service.editBlog(this.title, this.post);
  }
}
