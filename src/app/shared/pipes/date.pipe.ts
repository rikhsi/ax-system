import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'axDate',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(value: string): unknown {
    return moment(value).format('D MMMM yy');
  }

}
