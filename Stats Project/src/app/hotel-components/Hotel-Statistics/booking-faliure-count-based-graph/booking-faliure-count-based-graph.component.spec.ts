import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFaliureCountBasedGraphComponent } from './booking-faliure-count-based-graph.component';
describe('BookingFaliureCountBasedGraphComponent', () => {
  let component: BookingFaliureCountBasedGraphComponent;
  let fixture: ComponentFixture<BookingFaliureCountBasedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingFaliureCountBasedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFaliureCountBasedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
