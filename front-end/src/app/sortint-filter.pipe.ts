import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from './contact'
@Pipe({
  name: 'sortintFilter'
})
export class SortintFilterPipe implements PipeTransform {

  transform(contact: Contact[], key: string): Contact[] {
    let sorted_data = contact.sort((a,b) => { return a[key]<b[key] ? -1 : +1});
    return contact.sort((a,b) => {return a[key]-b[key]});
  }

}
