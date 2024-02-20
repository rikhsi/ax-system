import { Pipe, PipeTransform } from '@angular/core';
import { FilterItem } from 'src/app/typings';
import { Task } from 'src/app/typings/api/task';
import * as moment from 'moment';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(list: Task[], item: FilterItem): Task[] {
    if (!list.length || !item) {
      return list;
    }
    const sortedList = [...list];

    switch (item.type) {
      case 'date':
        sortedList.sort((a, b) => {
          const dateA = moment(a.date);
          const dateB = moment(b.date);
          return dateA.diff(dateB);
        });
        break;
    }

    return sortedList;
  }
}
