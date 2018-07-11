import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBooksComponent } from './modify-books.component';

describe('ModifyBooksComponent', () => {
  let component: ModifyBooksComponent;
  let fixture: ComponentFixture<ModifyBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
