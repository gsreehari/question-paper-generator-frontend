import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
  }

  listen(eventname:string):Observable<any>{
    return new Observable((subscribe)=>{
      this.socket.on(eventname,(data)=>{
        subscribe.next(data);
      })
    })
  }
  
}
