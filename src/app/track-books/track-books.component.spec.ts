import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBooksComponent } from './track-books.component';

describe('TrackBooksComponent', () => {
  let component: TrackBooksComponent;
  let fixture: ComponentFixture<TrackBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
