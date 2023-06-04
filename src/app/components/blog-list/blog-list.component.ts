import { Component, DoCheck, OnInit } from '@angular/core';
import { IBlog } from 'src/app/interfaces/main';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, DoCheck {
  public blogs: IBlog[] = [];
  public editState: boolean = false;
  public logged: boolean = false;
  public isAdmin: boolean = false;
  public userName: string = '';
  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.blogs = this.service.getBlogs();
    this.logged = this.service.userLogged;
  }
  ngDoCheck(): void {
    if (this.logged !== this.service.userLogged) {
      this.logged = this.service.userLogged;
      this.isAdmin = this.service.isAdmine();
      this.userName = this.service.getUserName();
    }
    if (this.blogs.length !== this.service.getBlogs().length) {
      this.blogs = this.service.getBlogs();
    }
  }
  showModal(blog?: IBlog): void {
    if(blog) this.service.id = blog.id;
    this.editState = !this.editState;
  }
  delete(index: number): void {
    if (typeof index === 'number') this.service.deleteBlog(index);
  }
}
