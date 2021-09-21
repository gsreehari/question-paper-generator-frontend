import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-data-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DataTableComponent implements OnChanges {
  @Input() data:any = null
  @Input() filterOptions:string[] = []
  @Output() response:EventEmitter<any> = new EventEmitter<any>()

  filterString:string = ""
  pageStartNo:number = 0
  pageEndNo:number = 0
  pageCount:number = 1
  pageOffset:number = 5
  totalPages:number[] = []
  currentPage:number = 1
  pages:number[] = []
  backward:boolean = false


  ngOnChanges(changes: SimpleChanges): void {
    this.renderPagination()
  }


  renderPagination(){
    this.totalPages = []
    for(let i=1;i<= Math.ceil(this.data.length/(this.pageCount*2));i++){
      this.totalPages.push(i);
    }
    this.pageEndNo = (this.currentPage * this.pageCount)*2;
    this.pages = this.totalPages.slice(0,this.pageOffset);

    var resultArray = this.data.slice(this.pageStartNo,this.pageEndNo)
    this.emitData(resultArray)
  }

  changePage(reverse:boolean,index:number){
    if(this.currentPage === index){
      return false
    }
    if(index == -1){
      this.currentPage = !reverse ? this.currentPage+1 : this.currentPage-1;
      
      if(this.currentPage >= 1 && this.currentPage < this.totalPages.length - 1){
        let a = this.currentPage-3 > -1 ? this.currentPage-3 : 0;
        let b = this.currentPage+2 < this.pageOffset ? this.pageOffset : this.currentPage+2;
        this.pages = this.totalPages.slice(a,b);
        this.backward = true;
      }
    }

    if(index > -1){
      this.currentPage = index;
      if(this.currentPage >= 1 && this.currentPage < this.totalPages.length - 1){
        let a = index-3 > -1 ? index-3 : 0;
        let b = index+2 < this.pageOffset ? this.pageOffset : index+2;
        this.pages = this.totalPages.slice(a,b);
      }
    }


    if(index != -2 && this.currentPage >= 1 && this.currentPage <= this.totalPages.length){
      if(reverse){
        this.pageStartNo = this.pageStartNo - (this.pageCount*2)
        this.pageEndNo = this.currentPage * (this.pageCount*2);
      }else{
        this.pageStartNo = this.pageEndNo;
        this.pageEndNo = this.currentPage * (this.pageCount*2);
      }
    }    

    var resultArray = this.data.slice(this.pageStartNo,this.pageEndNo)

    this.emitData(resultArray)
  }

  paginationCountChange(e){
    this.pageCount = e.target.value 
    this.renderPagination()
    // this.addToTable(this.dataSource);
  }
  
  lastAndFirstPageChange(num:number){
    let a = num === this.totalPages.length ? (this.totalPages.length) - this.pageOffset : 0 
    let b = num === 1 ? this.pageOffset : num; 
    this.pages = this.totalPages.slice(a,b);
    this.currentPage = num;
  }

  doFilter(value: string){
    this.filterString = value.trim().toLocaleLowerCase();
    const resultArray = [];
    if (this.data.length === 0 || this.filterString === '') {
      return this.renderPagination()
    }

    for (const item of this.data) {
      if (item.userDisplayName.indexOf(this.filterString) !== -1 || item.userId.indexOf(this.filterString) !== -1) {
        resultArray.push(item);
      }
    }
    this.emitData(resultArray)
  }

  emitData(data){
    this.response.emit(data)
  }

}

