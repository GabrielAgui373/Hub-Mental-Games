import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSumComponent } from './number-sum.component';

describe('NumberSumComponent', () => {
  let component: NumberSumComponent;
  let fixture: ComponentFixture<NumberSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
