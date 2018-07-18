import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperfirst'
})
export class UpperfirstPipe implements PipeTransform {

  transform(value: string): any {
    if(!value || value.length == 0) return ""
    var head = value[0].toUpperCase();
    var tail = value.substring(1);
    return head + tail; 
  }

}
