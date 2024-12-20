import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiUrl = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  // Get all posts
  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single post by ID
  getContact(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new post
  createContact(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  // Update a post by ID
  updateContact(id?: string, contact?: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contact);
  }

  // Delete a post by ID
  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  bulkUpdateContacts(updatedContacts: any[]): Observable<any[]> {
    return Observable.create((observer: any) => {
      const updateRequests = updatedContacts.map(contact =>
        this.http.put<any>(`${this.apiUrl}/${contact.id}`, contact).toPromise()
      );

      Promise.all(updateRequests)
        .then(results => {
          observer.next(results);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}
