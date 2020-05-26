import { TestBed } from '@angular/core/testing';

import { CanProceedToAboutGuard } from './can-proceed-to-about.guard';

describe('CanProceedToAboutGuard', () => {
  let guard: CanProceedToAboutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanProceedToAboutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
