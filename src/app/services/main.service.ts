import { Injectable } from '@angular/core';

import { IUser, IBlog } from '../interfaces/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public userLogged: boolean = false;
  public currentUser: IUser | null = null;
  private currentBlogId: number = 0;
  private users: IUser[] = [
    {
      email: 'admin@gmail.com',
      id: 0,
      password: 'admin',
      userName: 'admin'
    }
  ];
  private blogs: IBlog[] = [
    {
      id: 100,
      postedBy: 'admin',
      date: '10:00, 05.05.2023',
      message:'Sign up to create your account and start to use Angular Blog',
      topic: 'First post'
    }
  ];
  constructor() { }
  getBlogs(): IBlog[]{
    return this.blogs;
  }
  getBlog(id: number): IBlog | undefined{
    return this.blogs.find(blog => blog.id === id)
  }
  getUserName(): string{
    if(this.currentUser === null) return '';
    return this.currentUser.userName;
  }
  isAdmine(): boolean{
    if(this.currentUser?.userName === 'admin') return true;
    return false;
  }
  set id(id:number){
    if(typeof id === 'number'){
      this.currentBlogId = id;
    }
  }
  get id(): number{
    return this.currentBlogId
  }
  authorize(email: string, password: string): void{
    if(email && password){
      if(this.users.find(user => user.email === email.trim())?.password === password.trim()){
        this.userLogged = true;
        let user = this.users.find(user => user.email === email);
        if(user) this.currentUser = user;
      }
    }
  }
  logOut(){
    this.userLogged = false;
    this.currentUser = null;
  }
  register(name: string, email: string, password: string): void{
    if((name && email && password) && this.check(name, email)){
      this.users.push(this.createUser(name, email, password));
      this.authorize(email, password);
    }
  }
  private createUser(name: string, email: string, password: string): IUser{
    let id: number = this.users[this.users.length - 1]?.id + 1 | 1;
    return {
      userName: name.trim(),
      email: email.trim(),
      password: password.trim(),
      id
    } as IUser;
  }
  private check(name: string, email: string): boolean{
    let result = this.users.filter(user => user.userName === name.trim() || user.email === email.trim());
    return result.length === 0 ? true : false;
  }

  addBlog(title: string, post: string): void{
    if(title && post){
      this.blogs.push(this.createBlog(title, post));
    }
  }
  private createBlog(title: string, post: string): IBlog{
    let id: number = this.blogs[this.blogs.length - 1]?.id + 1 | 100;
    let dateStr = this.currentDate();
    return {
      id,
      postedBy: this.currentUser?.userName,
      topic: title.trim(),
      message: post.trim(),
      date: dateStr
    } as IBlog
  }
  private currentDate(): string{
    let date: Date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear();
    let dateStr = `${hours}:${minutes}, ${day}.${month}.${year}`;
    return dateStr;
  }
  editBlog(title: string, post: string): void{
    let blog = this.getBlog(this.currentBlogId)
    let changes: boolean = false;
    if(blog){
      let {topic, message} = blog;
      if(topic !== title || message !== post) changes = true;
    }
    if(blog && title && post){
      blog.topic = title.trim();
      blog.message = post.trim();
      blog.date = changes ? this.currentDate() : blog.date;
    }
    this.id = 0;
  }
  deleteBlog(index: number): void{
    if(index >= 0) this.blogs.splice(index, 1);
  }
}
