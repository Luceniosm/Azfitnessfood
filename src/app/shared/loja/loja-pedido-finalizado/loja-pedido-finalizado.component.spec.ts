import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaPedidoFinalizadoComponent } from './loja-pedido-finalizado.component';

describe('LojaPedidoFinalizadoComponent', () => {
  let component: LojaPedidoFinalizadoComponent;
  let fixture: ComponentFixture<LojaPedidoFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaPedidoFinalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaPedidoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
