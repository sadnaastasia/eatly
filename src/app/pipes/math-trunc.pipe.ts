import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathTrunc',
})
export class MathTruncPipe implements PipeTransform {
  transform(value: number, part: string): number {
    if (part === 'integer') {
      return Math.trunc(value);
    } else {
      return Number((value % 1).toFixed(2).substring(2));
    }
  }
}
