import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlaylistAlertComponent } from './delete-playlist-alert.component';

describe('DeletePlaylistAlertComponent', () => {
  let component: DeletePlaylistAlertComponent;
  let fixture: ComponentFixture<DeletePlaylistAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePlaylistAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlaylistAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
