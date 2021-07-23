import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpaperComponent } from './questionpaper.component';

describe('QuestionpaperComponent', () => {
  let component: QuestionpaperComponent;
  let fixture: ComponentFixture<QuestionpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionpaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
