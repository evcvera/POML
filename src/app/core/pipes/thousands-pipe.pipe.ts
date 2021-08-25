import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsPipe'
})
export class ThousandsPipePipe implements PipeTransform {

  public transform(value: any): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
