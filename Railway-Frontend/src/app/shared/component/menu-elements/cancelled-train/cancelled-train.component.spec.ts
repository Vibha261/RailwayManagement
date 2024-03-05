import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTrainComponent } from './cancelled-train.component';

describe('CancelledTrainComponent', () => {
  let component: CancelledTrainComponent;
  let fixture: ComponentFixture<CancelledTrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelledTrainComponent]
    });
    fixture = TestBed.createComponent(CancelledTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
