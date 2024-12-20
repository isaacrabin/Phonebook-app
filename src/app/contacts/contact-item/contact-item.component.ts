import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../../_models/contact.model';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMail, featherMessageSquare, featherPhoneCall, featherSearch, featherVideo } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { heroEllipsisVerticalSolid, heroArrowSmallLeftSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
  ],
  viewProviders: [provideIcons({ featherMessageSquare,featherPhoneCall,featherVideo,featherMail,
    heroUsers,heroEllipsisVerticalSolid,heroArrowSmallLeftSolid,featherSearch })],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})
export class ContactItemComponent {

  selectedContact: Contact = {};

  constructor(
    private router: Router
  ){
    this.selectedContact = JSON.parse(sessionStorage.getItem('selectedContact') as string);
  }

  back(){
    this.router.navigate(['contact-list'])
  }

  edit(){
    this.router.navigate(['edit-contact',this.selectedContact.id]);
  }
}
