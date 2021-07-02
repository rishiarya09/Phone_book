import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Contact, createContact} from './contact';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = "http://localhost:8000/api/"
 
  httpOptions = {
    headers: new HttpHeaders({
      'enctype' : 'multipart/form-data'
    })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getContacts() : Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl+'getAllContacts');
  }

  editContact(contact: FormData) : Observable<any>{
    return this.http.put<Contact>(this.apiUrl+'updateContact', contact).pipe(
      tap((contact: Contact) => console.log("edited succesfully")),
      catchError(this.handleError<Contact>('editContact'))
    );
  }

  createContact(contact: FormData):Observable<any>{
    console.log(contact);
    return this.http.post<createContact>(this.apiUrl+'createContact', contact, this.httpOptions).pipe(
      tap((contact: createContact) => console.log('creted succesfully')),
      catchError(this.handleError<createContact>('creteContact'))
    )
  }

  deleteContact(id: string):Observable<any>{
    return this.http.delete<Contact>(this.apiUrl+'deleteContact', {params: {'_id': id}}).pipe(
      tap(() => console.log('Deleted Succesfully')),
      catchError(this.handleError<createContact>('creteContact'))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // alert(error); // log to console instead


      return of(result as T);
    };
  }


}
