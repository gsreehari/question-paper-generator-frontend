import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { UsersService } from '../../../../../services/users/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  filterName:string = "";
  pageStartNo:number = 0;
  pageEndNo:number = 0;
  pageCount:number = 2;
  pageOffset:number = 5;
  totalPages:number[] = [];
  currentPage:number = 1;
  pages:number[] = [];
  backward:boolean = false;
  dataSource:any;

  constructor(private socketService:SocketService,private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res)=>{
      this.addToTable(res.data);
    })
    this.socketService.listen("users").subscribe(res=>{
      this.addToTable(res.data);
      console.log(res.data)
      console.table(res.data)
    })
  }

  addToTable(res){
    this.dataSource = null;
    this.dataSource = res;
    for(let i=1;i<= Math.ceil(res.length/(this.pageCount*2));i++){
      this.totalPages.push(i);
    }
    this.pageEndNo = (this.currentPage * this.pageCount)*2;
    this.pages = this.totalPages.slice(0,this.pageOffset);
  }

  changePage(reverse:boolean,index:number){
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

  }
  
  lastAndFirstPageChange(num:number){
    let a = num === this.totalPages.length ? (this.totalPages.length) - this.pageOffset : 0 
    let b = num === 1 ? this.pageOffset : num; 
    this.pages = this.totalPages.slice(a,b);
    this.currentPage = num;
  }

  doFilter(value: string){
    this.filterName = value.trim().toLocaleLowerCase();
  }

  pageChange(){

  }

  deleteUser(id){
    if(confirm('Are you sure to delete')){
      this.userService.deleteUser(id).subscribe(res=>{})
    }
  }
}
