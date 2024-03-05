import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByStationComponent } from './search-by-station.component';

describe('SearchByStationComponent', () => {
  let component: SearchByStationComponent;
  let fixture: ComponentFixture<SearchByStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByStationComponent]
    });
    fixture = TestBed.createComponent(SearchByStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
