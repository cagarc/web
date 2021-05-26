import { TestBed } from '@angular/core/testing';

import { OrdenpagoService } from './ordenpago.service';

describe('OrdenpagoService', () => {
  let service: OrdenpagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenpagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
