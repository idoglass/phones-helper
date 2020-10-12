import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaginListComponent } from './campagin-list.component';

describe('CampaginListComponent', () => {
  let component: CampaginListComponent;
  let fixture: ComponentFixture<CampaginListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaginListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaginListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
