import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'thousandsPipe'
})
export class ThousandsPipePipe implements PipeTransform {

  public transform(value: any): string {
    const aux = value.toString().replace('.', ',');
    return aux.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
