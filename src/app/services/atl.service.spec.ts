import { TestBed, inject } from '@angular/core/testing';

import { AtlService } from './atl.service';

describe('AtlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtlService]
    });
  });

  it('should be created', inject([AtlService], (service: AtlService) => {
    expect(service).toBeTruthy();
  }));
});
