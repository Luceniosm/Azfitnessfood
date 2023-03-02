import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardPagamentoAbertoComponent } from './admin-dashboard-pagamento-aberto.component';

describe('AdminDashboardPagamentoAbertoComponent', () => {
  let component: AdminDashboardPagamentoAbertoComponent;
  let fixture: ComponentFixture<AdminDashboardPagamentoAbertoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardPagamentoAbertoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardPagamentoAbertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
