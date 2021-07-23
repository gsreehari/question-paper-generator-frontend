import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(values: any[], pageStartNo:number, pageEndNo:number): any[] {

    let resultArray:any[] = []
    // let a = (pageNo*rowCount)-rowCount
    // let b = a+(rowCount*2);
    resultArray = values.slice(pageStartNo,pageEndNo)
    console.log(resultArray,pageStartNo,pageEndNo)

    return resultArray;
  }

}
