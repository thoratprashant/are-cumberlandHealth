import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskHistory } from './frontdesk-history';

describe('FrontdeskHistory', () => {
  let component: FrontdeskHistory;
  let fixture: ComponentFixture<FrontdeskHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontdeskHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontdeskHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
