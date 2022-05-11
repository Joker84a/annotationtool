import { TestBed } from '@angular/core/testing';

import { IoUtilsService } from './io-utils.service';

describe('IoUtilsService', () => {
  let service: IoUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IoUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
