import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import {Contacts} from '../mock-contact';
import {MatCardModule} from '@angular/material/card';
import {Contact} from "../contact";
import {ContactService} from '../contact.service'
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import {DynamicComponent} from '../dynamic/dynamic.component';
import {Subscription} from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit {
  sortdata: string = ""
  public search_filter: any = ""; //for the search filter
  @Output() contact_view = new EventEmitter<Contact>();
  @Input() updated_Contact: Contact = {
    "firstname" : '',
    "lastname" : '',
    'email' : '',
    'image' : '',
    'phone' : '' 
  };
  contact_list:Contact[] = [];
  // private cont_form = new FormData();
  constructor(private contactService: ContactService,   public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getContacts();
  }

  
  
 async getContacts(){
    this.contactService.getContacts().subscribe((contacts) => {
      //@ts-ignore
      this.contact_list =  Object.values(contacts)[1];
    });
  }


  ContactFunc(contact: Contact, opti:string){
    opti == "view" ? contact.view = "view" : contact.view = "edit";
    var dialogConfig = new MatDialogConfig();
    dialogConfig.data = {...contact};
    var dialogRef = this.dialog.open(DynamicComponent,dialogConfig); 
    dialogRef.afterClosed().subscribe( data => data != undefined ? data.view == "edit"? this.editContact(data) : "" : console.log("No data"));
  }

  editContact(data: Contact){
    delete data.view;
    const cont_form = new FormData();
    for(let key in data){
      cont_form.append(key, data[key])
    }
    
    this.contactService.editContact(cont_form).subscribe(data => data.success==true? this.getContacts(): console.log("error editing"));
  }
  sortintFilter(key: string){
    this.sortdata = key;
  }
  createContact(data: Contact){
    const cont_form = new FormData();
    for(let key in data){
      cont_form.append(key, data[key])
    }
    
    this.contactService.createContact(cont_form).subscribe(data => data.success==true? this.getContacts(): console.log("error creating"))
  }

  createC(){
  var contact = {
    "firstname" : '',
    "lastname" : '',
    'email' : '',
    'image' : '',
    'phone' : '',
    'view' : 'create' 
  };
  var received_Contact;
  var dialogConfig = new MatDialogConfig();
  dialogConfig.data = {...contact};
  var dialogRef = this.dialog.open(DynamicComponent,dialogConfig);
  dialogRef.afterClosed().subscribe( data => this.createContact(data));
  }

  DeleteContact(id: string){
    this.contactService.deleteContact(id).subscribe(data => data.success==true? this.getContacts(): console.log("error deleting"));
  }
}



