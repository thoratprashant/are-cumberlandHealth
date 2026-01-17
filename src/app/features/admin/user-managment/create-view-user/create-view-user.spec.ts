import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewUser } from './create-view-user';

describe('CreateViewUser', () => {
  let component: CreateViewUser;
  let fixture: ComponentFixture<CreateViewUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateViewUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateViewUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
