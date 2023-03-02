import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminClienteContratoPedidoComponent } from './admin-cliente-contrato-pedido.component';

describe('AdminClienteContratoPedidoComponent', () => {
  let component: AdminClienteContratoPedidoComponent;
  let fixture: ComponentFixture<AdminClienteContratoPedidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClienteContratoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClienteContratoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
