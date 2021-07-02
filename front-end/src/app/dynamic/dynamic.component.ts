import { Component, OnInit, Input, Inject, Optional, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import {Contact, createContact, Listfile} from '../contact';
import {ContactService} from '../contact.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { ReadVarExpr } from '@angular/compiler';
// import {ContactsListComponent} from '../contacts-list/contacts-list.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  // edit form validation starts
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
editForm: FormGroup = new FormGroup({});
  // edit form validation ends
  // @ViewChild('f', { static: false }) editForm: NgForm;
  submitted = false;
  d: createContact={
    "firstname" : '',
    "lastname" : '',
    'email' : '',
    'image' : [],
    'phone' : ''
  }
  
  selected_files: Listfile  = {
    name : "",
    size : null,
    type : ""

  };
  selected_file:string = "";
  public up_contact: createContact= {
    "firstname" : '',
    "lastname" : '',
    "email" : '',
    "phone" : '',
    "image" : []
  };

  @Input() contact_received: Contact = {
    "firstname" : '',
    "lastname" : '',
    'email' : '',
    'image' : '',
    'phone' : '' 
  };
  @Output() modifiedContact = new EventEmitter<Contact>();
  fileAttr = 'Choose File';
  constructor(
    // public contactlist:  ContactsListComponent,
    public formBuilder: FormBuilder,
    private contaService: ContactService,
    @Optional() public dialogRef: MatDialogRef<DynamicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact) { }
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
          'firstname' : new FormControl('', [Validators.required]),
          'lastname' : new FormControl(null, [Validators.required]),
          'email' : new FormControl(null, [Validators.required, Validators.email]),
          'phone' : new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })
    
  }
  get getControl(){
    return this.editForm.controls;
  }


  editDetails(data: createContact){
    this.up_contact._id = data._id;
    var phone_num = data.phone.toString();
    if( data.firstname.length <3 ){
      alert("please enter atlest 3 letters in  firstname ")
    } else if(data.lastname.length < 1){
      alert("please enter atlest 1 letter in lastname ")
    } else if(data.email.length < 6){
      alert("enter a valid email address ")
    } else if(phone_num.length != 10){
      alert("enter a valid email address ")
    } 
else{  
    this.up_contact.firstname = data.firstname ;
    this.up_contact.lastname = data.lastname;
    this.up_contact.email = data.email;
    this.up_contact.phone = data.phone;
    this.up_contact.view = "edit";
    this.up_contact.image = this.selected_files;
    this.dialogRef.close(this.up_contact);
    }
    
    // this.selected_files.name != "" ? this.up_contact.image = data.imageName : this.up_contact.image = this.selected_files;
  }
closeDialog(){
  this.contact_received.view = "";
  this.dialogRef.close();

}


selectFiles(event: any){
  this.selected_files = event.target.files[0];

  if(this.selected_files){
    const reader = new FileReader();
    reader.onload = (e: any) => {
    }
    this.selected_file = this.selected_files.name;
  }
}

createContact(data: createContact ){
  if( data.firstname.length <3 ){
    alert("please enter atlest 3 letters in  firstname ")
  } else if(data.lastname.length < 1){
    alert("please enter atlest 1 letter in lastname ")
  } else if(data.email.length < 6){
    alert("enter a valid email address ")
  } else if(data.phone.length != 10){
    alert("enter a valid email address ")
  } else if(this.selected_files.name != ''){data.image = this.selected_files; this.dialogRef.close(data);} else alert("please add image"); 

  
}

}
