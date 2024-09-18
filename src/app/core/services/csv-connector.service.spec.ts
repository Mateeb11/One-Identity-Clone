import { TestBed } from '@angular/core/testing';

import { CsvConnectorService } from './csv-connector.service';

describe('CsvConnectorService', () => {
  let service: CsvConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
