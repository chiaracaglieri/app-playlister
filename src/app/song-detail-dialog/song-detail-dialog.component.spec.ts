import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailDialogComponent } from './song-detail-dialog.component';

describe('SongDetailDialogComponent', () => {
  let component: SongDetailDialogComponent;
  let fixture: ComponentFixture<SongDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
