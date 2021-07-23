import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratepaperComponent } from './generatepaper.component';

describe('GeneratepaperComponent', () => {
  let component: GeneratepaperComponent;
  let fixture: ComponentFixture<GeneratepaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratepaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
