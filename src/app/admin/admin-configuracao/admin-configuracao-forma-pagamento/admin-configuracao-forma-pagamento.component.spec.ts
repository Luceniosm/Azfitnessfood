import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminConfiguracaoFormaPagamentoComponent } from './admin-configuracao-forma-pagamento.component';

describe('AdminConfiguracaoFormaPagamentoComponent', () => {
  let component: AdminConfiguracaoFormaPagamentoComponent;
  let fixture: ComponentFixture<AdminConfiguracaoFormaPagamentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoFormaPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
