import { Pipe, PipeTransform } from '@angular/core';
import { FilterItem } from 'src/app/typings';
import { Task } from 'src/app/typings/api/task';

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
   
          const dateA = new Date(a.date).getDay();
          const dateB = new Date(b.date).getDate();
          return dateA - dateB;
        });
        break;
    }

    return sortedList;
  }
}
