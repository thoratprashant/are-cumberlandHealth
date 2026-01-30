import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUpdateModal } from './request-update-modal';

describe('RequestUpdateModal', () => {
  let component: RequestUpdateModal;
  let fixture: ComponentFixture<RequestUpdateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestUpdateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestUpdateModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
