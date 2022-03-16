import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticPartnerManagerComponent } from './logistic-partner-manager.component';

describe('LogisticPartnerManagerComponent', () => {
  let component: LogisticPartnerManagerComponent;
  let fixture: ComponentFixture<LogisticPartnerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticPartnerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticPartnerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
