import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSongDialogComponent } from './get-song-dialog.component';

describe('GetSongDialogComponent', () => {
  let component: GetSongDialogComponent;
  let fixture: ComponentFixture<GetSongDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSongDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
