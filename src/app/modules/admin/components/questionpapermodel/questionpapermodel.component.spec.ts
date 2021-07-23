import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpapermodelComponent } from './questionpapermodel.component';

describe('QuestionpapermodelComponent', () => {
  let component: QuestionpapermodelComponent;
  let fixture: ComponentFixture<QuestionpapermodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionpapermodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpapermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
