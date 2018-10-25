import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEmailComponentComponent } from './hotel-email-component.component';

describe('HotelEmailComponentComponent', () => {
  let component: HotelEmailComponentComponent;
  let fixture: ComponentFixture<HotelEmailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelEmailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelEmailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
