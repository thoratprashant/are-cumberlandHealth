import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailsNotes } from './appointment-details-notes';

describe('AppointmentDetailsNotes', () => {
  let component: AppointmentDetailsNotes;
  let fixture: ComponentFixture<AppointmentDetailsNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDetailsNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailsNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
