import { TestBed, inject } from '@angular/core/testing';

import { ApiDataParserService } from './api-data-parser.service';

describe('ApiDataParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDataParserService]
    });
  });

  it('should be created', inject([ApiDataParserService], (service: ApiDataParserService) => {
    expect(service).toBeTruthy();
  }));
});
