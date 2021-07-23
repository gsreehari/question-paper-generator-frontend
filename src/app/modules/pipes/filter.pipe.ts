import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filterString: string): any[] {

    const resultArray = [];
    if (values){
      if (values.length === 0 || filterString === '') {
        return values;
      }

      for (const item of values) {
        if (item.userDisplayName.indexOf(filterString) !== -1) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }

}
