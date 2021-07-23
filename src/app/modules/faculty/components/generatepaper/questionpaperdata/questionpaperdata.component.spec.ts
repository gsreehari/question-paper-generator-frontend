import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpaperdataComponent } from './questionpaperdata.component';

describe('QuestionpaperdataComponent', () => {
  let component: QuestionpaperdataComponent;
  let fixture: ComponentFixture<QuestionpaperdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpaperdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpaperdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
