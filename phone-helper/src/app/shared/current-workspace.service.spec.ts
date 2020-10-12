import { TestBed } from '@angular/core/testing';

import { CurrentWorkspaceService } from './current-workspace.service';

describe('CurrentWorkspaceService', () => {
  let service: CurrentWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
