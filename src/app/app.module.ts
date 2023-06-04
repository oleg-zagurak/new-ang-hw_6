import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogComponent } from './components/blog/blog.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogComponent,
    SignInComponent,
    SignUpComponent,
    BlogListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
