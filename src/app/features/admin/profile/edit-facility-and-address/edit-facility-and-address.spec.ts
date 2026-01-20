import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacilityAndAddress } from './edit-facility-and-address';

describe('EditFacilityAndAddress', () => {
  let component: EditFacilityAndAddress;
  let fixture: ComponentFixture<EditFacilityAndAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFacilityAndAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacilityAndAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
