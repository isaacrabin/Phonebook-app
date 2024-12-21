import { Component } from '@angular/core';
import { ContactsService } from '../../../_services/contacts.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../_models/contact.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroListBullet, heroTrash, heroUserGroup, heroUsers } from '@ng-icons/heroicons/outline';
import { featherGrid, featherSearch } from '@ng-icons/feather-icons';
import { heroEllipsisVerticalSolid,heroArrowSmallLeftSolid, heroUserGroupSolid } from '@ng-icons/heroicons/solid';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContactPipe } from '../../_pipes/contact.pipe';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    SelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    ContactPipe
  ],
  viewProviders: [provideIcons({ heroTrash,
    featherGrid,
    heroUserGroupSolid,
    heroListBullet,heroUsers,heroEllipsisVerticalSolid,heroArrowSmallLeftSolid,featherSearch })],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contacts: Contact[] = [];
  searchText: string = '';
  loading: boolean = false;
  showBulkDelete: boolean = false;
  displayMode: string;

  constructor(
    private _service: ContactsService,
    private toastr: ToastrService,
    private router: Router) {
      this.displayMode =  sessionStorage.getItem('displayMode') ?? 'list';
    }

  ngOnInit(): void {
    this.loadContacts();

    this._service.createContact({ firstName: 'Alice', email: 'alice@example.com' }).subscribe();
  }



  loadContacts(): void {
    this._service.getContacts().subscribe(data => {
      const activeContacts = data.filter((contact: Contact) => contact.frozenYN !==  true)
      this.contacts = activeContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    });
  }

  addPost(): void {
    const newPost = { title: 'New Post', content: 'Content of the new post' };
    this._service.createContact(newPost).subscribe(() => {
      this.loadContacts(); // Reload posts after adding
    });
  }

  deleteContact(id: string): void {
    this._service.deleteContact(id).subscribe(() => {
      this.toastr.success('Contact has been deleted successfully')
      this.loadContacts(); // Reload posts after deleting
    });
  }

  softDeleteContact(contact: Contact): void {
    this.loading = true
    setTimeout(() => {
      const updatedPost = { ...contact, frozenYN: true };
      this._service.updateContact(contact.id, updatedPost).subscribe(() => {
        this.loading = false;
        this.toastr.success(`Contact updated successfully`,'',{positionClass:'toast-top-center',timeOut:1000});
        this.loadContacts();
      });
    },1000)
  }

  bulkDelete(): void {
    this.contacts = this.contacts.filter(contact => !contact.isSelected);
  }

  bulkUpdate(): void {
    this.contacts.forEach(contact => {
      if (contact.isSelected) {
        contact.frozenYN = true; // Change the field value as needed
      }
    });
  }

  back(){
    this.router.navigate(['/'])
  }

  viewMore(contact: Contact){
    sessionStorage.setItem('selectedContact', JSON.stringify(contact));
    this.router.navigate(['contact-details', contact.id])
  }

  editContact(contact: Contact){
    this.router.navigate(['edit-contact',contact.id]);
  }

  showDeleteAlert(contact: Contact) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove this contact from your contact list!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Delete Contact',

    }).then(result => {
      if (result.value) {
        this.softDeleteContact(contact);
      }
    });
  }

  bulkUpdateFrozen(): void {
    const updatedContacts = this.contacts
      .filter(contact => contact.isSelected)  // Only selected contacts
      .map(contact => ({
        ...contact,
        frozenYN: !contact.frozenYN  // Toggle the frozenYN field
      }));

    if (updatedContacts.length > 0) {
      this._service.bulkUpdateContacts(updatedContacts).subscribe(
        response => {
         this.toastr.success('Contacts removed successfully')
         this.showBulkDelete = false;
         this.loadContacts();
          // Handle success - update the contacts list with the new values
          this.contacts = this.contacts.map(contact => {
            const updated = updatedContacts.find(u => u.id === contact.id);
            return updated ? updated : contact;
          });
        },
        error => {
          console.error('Error updating contacts:', error);
          // Handle error (show error message)
        }
      );
    } else {
      console.log('No contacts selected for update.');
    }
  }

  onCheckChange(event: any){
    const updatedContacts = this.contacts
    .filter(contact => contact.isSelected)  // Only selected contacts
    .map(contact => ({
      ...contact,
      frozenYN: !contact.frozenYN  // Toggle the frozenYN field
    }));

    if(updatedContacts.length > 0) {
      this.showBulkDelete = true;
    }

  }

  changeView(type: string){
    if(type === 'list'){
    sessionStorage.setItem('displayMode','grid');
    this.displayMode = 'grid';
    }
    else{
      this.displayMode = 'list';
      sessionStorage.setItem('displayMode','list');
    }
  }
}
