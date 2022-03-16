import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerManagerComponent } from './seller-manager.component';

describe('SellerManagerComponent', () => {
  let component: SellerManagerComponent;
  let fixture: ComponentFixture<SellerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
