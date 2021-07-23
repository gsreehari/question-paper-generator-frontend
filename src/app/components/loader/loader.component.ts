import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(
    public loadingService:LoaderService
  ) { }

  ngOnInit(): void {
  }

}
