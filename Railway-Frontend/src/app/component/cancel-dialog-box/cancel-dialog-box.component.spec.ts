import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDialogBoxComponent } from './cancel-dialog-box.component';

describe('CancelDialogBoxComponent', () => {
  let component: CancelDialogBoxComponent;
  let fixture: ComponentFixture<CancelDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelDialogBoxComponent]
    });
    fixture = TestBed.createComponent(CancelDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
