import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceDetailsModal } from './edit-insurance-details-modal';

describe('EditInsuranceDetailsModal', () => {
  let component: EditInsuranceDetailsModal;
  let fixture: ComponentFixture<EditInsuranceDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInsuranceDetailsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInsuranceDetailsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
