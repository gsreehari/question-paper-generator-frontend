import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], filterString: string): any[] {

    const resultArray = [];
    if (data){
      if (data.length === 0 || filterString === '') {
        return data;
      }

      for (const item of data) {
        if (item.userDisplayName.indexOf(filterString) !== -1 || item.userId.indexOf(filterString) !== -1) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }

}
