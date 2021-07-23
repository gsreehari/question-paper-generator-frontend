import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { PaginationPipe } from './pagination.pipe';



@NgModule({
  declarations: [FilterPipe, PaginationPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe,
    PaginationPipe
  ]
})
export class PipesModule { 
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}
