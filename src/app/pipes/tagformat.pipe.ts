import { Pipe, PipeTransform } from '@angular/core';
import { englishTags } from '../languages';

@Pipe({
  name: 'tagformat'
})
export class TagFormatPipe implements PipeTransform {

  transform(value: string): any {
    if(typeof englishTags !== "undefined")
      return englishTags[value];
    
      
  }

}
