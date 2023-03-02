import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminClientePedidoComponent } from './admin-cliente-pedido.component';

describe('AdminClientePedidoComponent', () => {
  let component: AdminClientePedidoComponent;
  let fixture: ComponentFixture<AdminClientePedidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
