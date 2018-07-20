import { Pipe, PipeTransform } from '@angular/core';
import { englishTags } from '../languages';

@Pipe({
  name: 'tagformat'
})
export class TagFormatPipe implements PipeTransform {

  transform(value: string): any {
    if (typeof value === "undefined" || value.length == 0) return ""

    if(typeof englishTags[value] !== "undefined")
      return englishTags[value];
    else{
      var head = value[0].toUpperCase();
      var tail = value.substring(1);
      return head + tail; 
    }
    
  }

}
