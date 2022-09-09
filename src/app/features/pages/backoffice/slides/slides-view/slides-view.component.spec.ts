import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesViewComponent } from './slides-view.component';

describe('SlidesViewComponent', () => {
  let component: SlidesViewComponent;
  let fixture: ComponentFixture<SlidesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
