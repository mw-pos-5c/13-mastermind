import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestFilter'
})
export class RequestFilterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {

    console.log(value, args);

    if (!value.includes(args[0])) {
      return '** not relevant **'
    }

    return value;
  }

}
