import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOverviewComponent } from './browse-overview.component';

describe('BrowseOverviewComponent', () => {
  let component: BrowseOverviewComponent;
  let fixture: ComponentFixture<BrowseOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
