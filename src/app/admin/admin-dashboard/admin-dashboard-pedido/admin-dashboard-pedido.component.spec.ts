import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardPedidoComponent } from './admin-dashboard-pedido.component';

describe('AdminDashboardPedidoComponent', () => {
  let component: AdminDashboardPedidoComponent;
  let fixture: ComponentFixture<AdminDashboardPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
