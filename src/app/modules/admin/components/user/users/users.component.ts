import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { UsersService } from '../../../../../services/users/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource:any;
  data_table_data:any;
  filterOptions:string[] = ['userDisplayName','userId']

  constructor(private socketService:SocketService,private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res)=>{
      this.dataSource = res.data;
    })
    this.socketService.listen("users").subscribe(res=>{
      this.dataSource = null;
      this.dataSource = res.data
    })
  }

  onResponse(event){
    this.data_table_data = null;
    // this.totalPages = []
    this.data_table_data = event;
  }

  deleteUser(id){
    if(confirm('Are you sure to delete')){
      this.userService.deleteUser(id).subscribe(res=>{})
    }
  }
}
