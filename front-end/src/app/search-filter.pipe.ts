import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(contacts: Contact[], search_filter: string): Contact[] {
    if(!contacts || !search_filter){
      return contacts;
    }
    
    return contacts.filter( contact => {
      return contact.firstname.toLowerCase().indexOf(search_filter.toLowerCase()) != -1
    
    })
  }

}
