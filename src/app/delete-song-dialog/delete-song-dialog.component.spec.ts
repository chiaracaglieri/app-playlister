import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongDialogComponent } from './delete-song-dialog.component';

describe('DeleteSongDialogComponent', () => {
  let component: DeleteSongDialogComponent;
  let fixture: ComponentFixture<DeleteSongDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSongDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
