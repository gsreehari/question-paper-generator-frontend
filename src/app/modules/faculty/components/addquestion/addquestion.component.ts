import { Component, ComponentFactoryResolver, ComponentRef,ViewContainerRef,ViewChild,OnInit } from '@angular/core';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences:ComponentRef<any> = null;

  subjects:any[] = [];
  activeLink:number;

  constructor(private CFR: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.subjects = JSON.parse(localStorage.getItem('subjects'));
  }

  createComponent(subject:any,i:number) {
    this.VCR.clear();
    this.activeLink = i;
    let componentFactory = this.CFR.resolveComponentFactory(SubjectComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    childComponent.subject = subject;
    this.componentsReferences = childComponentRef;
  }
}
