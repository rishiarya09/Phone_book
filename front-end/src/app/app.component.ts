import { Component } from '@angular/core';
import {Contact} from './contact';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phone-book';
  dynamic_contact: Contact = {
    "firstname" : '',
    "lastname" : '',
    'email' : '',
    'image' : '',
    'phone' : '' 
  };
  updated_Contact: Contact = {
    "firstname" : '',
    "lastname" : '',
    'email' : '',
    'image' : '',
    'phone' : '' 
  }; 
  contact_op(fired_contact: Contact){
    this.dynamic_contact = fired_contact;
  }
  contactUpdate(updatedContact: Contact){
    this.updated_Contact = updatedContact; 
  }
}
