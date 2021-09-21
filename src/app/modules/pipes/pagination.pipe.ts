import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(values: any[], pageStartNo:number, pageEndNo:number): any[] {

    let resultArray:any[] = []
    resultArray = values.slice(pageStartNo,pageEndNo)

    return resultArray;
  }

}
