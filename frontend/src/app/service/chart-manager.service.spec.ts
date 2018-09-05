import { TestBed, inject } from '@angular/core/testing';

import { ChartManagerService } from './chart-manager.service';

describe('ChartManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartManagerService]
    });
  });

  it('should be created', inject([ChartManagerService], (service: ChartManagerService) => {
    expect(service).toBeTruthy();
  }));
});
