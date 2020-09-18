import { TestBed } from '@angular/core/testing';

import { UialertService } from './uialert.service';

describe('UialertService', () => {
  let service: UialertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UialertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
