import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAlertErrorComponent } from './mat-alert-error.component';

describe('MatAlertErrorComponent', () => {
  let component: MatAlertErrorComponent;
  let fixture: ComponentFixture<MatAlertErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatAlertErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAlertErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
