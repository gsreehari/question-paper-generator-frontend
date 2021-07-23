import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpapersComponent } from './questionpapers.component';

describe('QuestionpapersComponent', () => {
  let component: QuestionpapersComponent;
  let fixture: ComponentFixture<QuestionpapersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpapersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
