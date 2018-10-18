import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBasedGraphComponent } from './rating-based-graph.component';

describe('RatingBasedGraphComponent', () => {
  let component: RatingBasedGraphComponent;
  let fixture: ComponentFixture<RatingBasedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingBasedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingBasedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
