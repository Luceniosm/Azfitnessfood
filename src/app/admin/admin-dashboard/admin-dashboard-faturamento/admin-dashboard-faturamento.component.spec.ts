import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardFaturamentoComponent } from './admin-dashboard-faturamento.component';

describe('AdminDashboardFaturamentoComponent', () => {
  let component: AdminDashboardFaturamentoComponent;
  let fixture: ComponentFixture<AdminDashboardFaturamentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardFaturamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
