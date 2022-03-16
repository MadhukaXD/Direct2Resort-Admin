import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidQoutesComponent } from './bid-qoutes.component';

describe('BidQoutesComponent', () => {
  let component: BidQoutesComponent;
  let fixture: ComponentFixture<BidQoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidQoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidQoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
