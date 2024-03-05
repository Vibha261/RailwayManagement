import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivertedTrainComponent } from './diverted-train.component';

describe('DivertedTrainComponent', () => {
  let component: DivertedTrainComponent;
  let fixture: ComponentFixture<DivertedTrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivertedTrainComponent]
    });
    fixture = TestBed.createComponent(DivertedTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
