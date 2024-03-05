import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTrainNumberComponent } from './search-by-train-number.component';

describe('SearchByTrainNumberComponent', () => {
  let component: SearchByTrainNumberComponent;
  let fixture: ComponentFixture<SearchByTrainNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByTrainNumberComponent]
    });
    fixture = TestBed.createComponent(SearchByTrainNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
