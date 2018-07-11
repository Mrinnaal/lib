import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitBooksComponent } from './limit-books.component';

describe('LimitBooksComponent', () => {
  let component: LimitBooksComponent;
  let fixture: ComponentFixture<LimitBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
