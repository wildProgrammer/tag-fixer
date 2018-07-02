import { TestBed, inject } from '@angular/core/testing';

import { FilesListService } from './files-list.service';

describe('FilesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesListService]
    });
  });

  it('should be created', inject([FilesListService], (service: FilesListService) => {
    expect(service).toBeTruthy();
  }));
});
