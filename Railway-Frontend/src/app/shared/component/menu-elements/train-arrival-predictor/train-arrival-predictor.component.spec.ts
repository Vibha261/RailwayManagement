import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainArrivalPredictorComponent } from './train-arrival-predictor.component';

describe('TrainArrivalPredictorComponent', () => {
  let component: TrainArrivalPredictorComponent;
  let fixture: ComponentFixture<TrainArrivalPredictorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainArrivalPredictorComponent]
    });
    fixture = TestBed.createComponent(TrainArrivalPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
