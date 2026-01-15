import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskLayout } from './frontdesk-layout';

describe('FrontdeskLayout', () => {
  let component: FrontdeskLayout;
  let fixture: ComponentFixture<FrontdeskLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontdeskLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontdeskLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
