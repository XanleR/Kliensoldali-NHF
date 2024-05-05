import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetailsPageComponent } from './house-details-page.component';

describe('HouseDetailsPageComponent', () => {
  let component: HouseDetailsPageComponent;
  let fixture: ComponentFixture<HouseDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
