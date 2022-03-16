import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleProductComponent } from './admin-single-product.component';

describe('AdminSingleProductComponent', () => {
  let component: AdminSingleProductComponent;
  let fixture: ComponentFixture<AdminSingleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSingleProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
