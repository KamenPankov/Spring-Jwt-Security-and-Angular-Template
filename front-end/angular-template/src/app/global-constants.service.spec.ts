/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalConstantsService } from './global-constants.service';

describe('Service: GlobalConstants', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalConstantsService]
    });
  });

  it('should ...', inject([GlobalConstantsService], (service: GlobalConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
