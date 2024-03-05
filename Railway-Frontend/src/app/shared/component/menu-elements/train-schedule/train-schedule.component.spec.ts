import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainScheduleComponent } from './train-schedule.component';

describe('TrainScheduleComponent', () => {
  let component: TrainScheduleComponent;
  let fixture: ComponentFixture<TrainScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainScheduleComponent]
    });
    fixture = TestBed.createComponent(TrainScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
