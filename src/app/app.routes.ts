import { Routes } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { HomeComponent } from './home/home.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact-details/:id',
    component: ContactItemComponent
  },
  {
    path: 'edit-contact/:id',
    component: EditContactComponent
  },
  {
    path: 'contact-list',
    component: ContactListComponent
  },
];
