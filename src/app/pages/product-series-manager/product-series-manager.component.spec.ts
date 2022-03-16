import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSeriesManagerComponent } from './product-series-manager.component';

describe('ProductSeriesManagerComponent', () => {
  let component: ProductSeriesManagerComponent;
  let fixture: ComponentFixture<ProductSeriesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSeriesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSeriesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
