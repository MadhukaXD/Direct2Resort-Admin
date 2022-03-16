import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerManagerComponent } from './buyer-manager.component';

describe('BuyerManagerComponent', () => {
  let component: BuyerManagerComponent;
  let fixture: ComponentFixture<BuyerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
