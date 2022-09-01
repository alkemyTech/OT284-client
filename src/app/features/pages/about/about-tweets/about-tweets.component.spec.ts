import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTweetsComponent } from './about-tweets.component';

describe('AboutTweetsComponent', () => {
  let component: AboutTweetsComponent;
  let fixture: ComponentFixture<AboutTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
