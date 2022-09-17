import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWelcometextComponent } from './home-welcometext.component';

describe('HomeWelcometextComponent', () => {
  let component: HomeWelcometextComponent;
  let fixture: ComponentFixture<HomeWelcometextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeWelcometextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWelcometextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
