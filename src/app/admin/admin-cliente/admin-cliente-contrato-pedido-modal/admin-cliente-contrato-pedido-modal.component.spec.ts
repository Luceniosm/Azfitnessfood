import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminClienteContratoPedidoModalComponent } from './admin-cliente-contrato-pedido-modal.component';

describe('AdminClienteContratoPedidoModalComponent', () => {
  let component: AdminClienteContratoPedidoModalComponent;
  let fixture: ComponentFixture<AdminClienteContratoPedidoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClienteContratoPedidoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClienteContratoPedidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
