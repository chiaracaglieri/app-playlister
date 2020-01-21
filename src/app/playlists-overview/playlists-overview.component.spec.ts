import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsOverviewComponent } from './playlists-overview.component';

describe('PlaylistsOverviewComponent', () => {
  let component: PlaylistsOverviewComponent;
  let fixture: ComponentFixture<PlaylistsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
