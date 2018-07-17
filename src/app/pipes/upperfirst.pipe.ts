import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperfirst'
})
export class UpperfirstPipe implements PipeTransform {

  transform(value: string): any {
    var head = value[0].toUpperCase();
    var tail = value.substring(1);
    return head + tail; 
  }

}
