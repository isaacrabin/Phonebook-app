import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contact',
  standalone: true
})
export class ContactPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.firstName.toLocaleLowerCase().includes(args)) || (val.lastName.toLocaleLowerCase().includes(args));
      return rVal;
    });
  }

}
