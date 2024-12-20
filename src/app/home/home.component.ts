import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  NgxTypedJsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public router: Router) {}
  viewContacts(){
    this.router.navigate(['contact-list'])
  }
}
