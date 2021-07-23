import { Component, ComponentFactoryResolver, ComponentRef,ViewContainerRef,ViewChild,OnInit } from '@angular/core';
import { SubjectComponent } from '../subject/subject.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences:ComponentRef<any> = null;

  subjects:any[] = [];

  constructor(private CFR: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.subjects = JSON.parse(localStorage.getItem('subjects'));
  }

  createComponent() {
    this.VCR.clear();
    let componentFactory = this.CFR.resolveComponentFactory(SubjectComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
    this.componentsReferences = childComponentRef;
  }

}
