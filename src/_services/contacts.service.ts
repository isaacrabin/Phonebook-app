import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../_models/contact.model';
import { contacts } from '../_models/data';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = contacts;
  // private apiUrl = '/api/contacts';

  // constructor(private http: HttpClient) {}

  // // Get all posts
  // getContacts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // // Get a single post by ID
  // getContact(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }

  // // Create a new post
  // createContact(post: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, post);
  // }

  // // Update a post by ID
  // updateContact(id?: string, contact?: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, contact);
  // }

  // // Delete a post by ID
  // deleteContact(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${id}`);
  // }


  // bulkUpdateContacts(updatedContacts: any[]): Observable<any[]> {
  //   return Observable.create((observer: any) => {
  //     const updateRequests = updatedContacts.map(contact =>
  //       this.http.put<any>(`${this.apiUrl}/${contact.id}`, contact).toPromise()
  //     );

  //     Promise.all(updateRequests)
  //       .then(results => {
  //         observer.next(results);
  //         observer.complete();
  //       })
  //       .catch(error => observer.error(error));
  //   });
  // }



  constructor() { }

  // Get all contacts
  getContacts(): Observable<any[]> {
    return of(this.contacts);
  }

  // Get a single contact by ID
  getContact(id: string): Observable<any> {
    const contact = this.contacts.find(c => c.id === id);
    return of(contact);
  }

  // Create a new contact
  createContact(contact: any): Observable<any> {
    this.contacts.push(contact);
    return of(contact);
  }

  // Update a contact
  updateContact(id?: string, contact?: any): Observable<any> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...contact };
    }
    return of(this.contacts[index]);
  }

  // Delete a contact by ID
  deleteContact(id: string): Observable<any> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      const deletedContact = this.contacts.splice(index, 1);
      return of(deletedContact[0]);
    }
    return of(null);
  }

  // Bulk update contacts
  bulkUpdateContacts(updatedContacts: any[]): Observable<any[]> {
    updatedContacts.forEach(updatedContact => {
      const index = this.contacts.findIndex(c => c.id === updatedContact.id);
      if (index !== -1) {
        this.contacts[index] = { ...this.contacts[index], ...updatedContact };
      }
    });
    return of(this.contacts);
  }
}
