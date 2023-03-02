import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaPagamentoComponent } from './loja-pagamento.component';

describe('LojaPagamentoComponent', () => {
  let component: LojaPagamentoComponent;
  let fixture: ComponentFixture<LojaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
