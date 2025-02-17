import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesPageComponent } from './houses-page.component';

describe('HousesPageComponent', () => {
  let component: HousesPageComponent;
  let fixture: ComponentFixture<HousesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
