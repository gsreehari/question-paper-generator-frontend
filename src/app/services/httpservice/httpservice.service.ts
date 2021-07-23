import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service'
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor{

  constructor(public loadingService:LoaderService,private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.isLoading.next(true);
    let token = localStorage.getItem('token');
    if(token){
      req = req.clone({
        setHeaders:{
          'Authorization':`Bearer ${token}`
        }
      })
    }
    return next.handle(req).pipe(
      finalize(()=>{
        this.loadingService.isLoading.next(false);
        // this.loadingService.isLoading.value;
      })
    );
  }
}
