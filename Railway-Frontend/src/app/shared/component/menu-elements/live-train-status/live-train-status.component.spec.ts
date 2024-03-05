import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrainStatusComponent } from './live-train-status.component';

describe('LiveTrainStatusComponent', () => {
  let component: LiveTrainStatusComponent;
  let fixture: ComponentFixture<LiveTrainStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveTrainStatusComponent]
    });
    fixture = TestBed.createComponent(LiveTrainStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
