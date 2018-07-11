import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenBooksComponent } from './taken-books.component';

describe('TakenBooksComponent', () => {
  let component: TakenBooksComponent;
  let fixture: ComponentFixture<TakenBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakenBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
