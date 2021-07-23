import { TestBed } from '@angular/core/testing';

import { QuestionpaperService } from './questionpaper.service';

describe('QuestionpaperService', () => {
  let service: QuestionpaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionpaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
