import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpapergeneratorComponent } from './questionpapergenerator.component';

describe('QuestionpapergeneratorComponent', () => {
  let component: QuestionpapergeneratorComponent;
  let fixture: ComponentFixture<QuestionpapergeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpapergeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpapergeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
