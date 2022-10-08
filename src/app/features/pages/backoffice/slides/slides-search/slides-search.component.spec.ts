import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesSearchComponent } from './slides-search.component';

describe('SlidesSearchComponent', () => {
  let component: SlidesSearchComponent;
  let fixture: ComponentFixture<SlidesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
