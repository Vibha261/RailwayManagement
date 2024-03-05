import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTrainsComponent } from './booking-trains.component';

describe('BookingTrainsComponent', () => {
  let component: BookingTrainsComponent;
  let fixture: ComponentFixture<BookingTrainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingTrainsComponent]
    });
    fixture = TestBed.createComponent(BookingTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
