import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditActivityComponent } from './create-edit-activity.component';

describe('CreateEditActivityComponent', () => {
  let component: CreateEditActivityComponent;
  let fixture: ComponentFixture<CreateEditActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
