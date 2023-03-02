import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminConfiguracaoFormaPagamentoCadastroComponent } from './admin-configuracao-forma-pagamento-cadastro.component';

describe('AdminConfiguracaoFormaPagamentoCadastroComponent', () => {
  let component: AdminConfiguracaoFormaPagamentoCadastroComponent;
  let fixture: ComponentFixture<AdminConfiguracaoFormaPagamentoCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoFormaPagamentoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoFormaPagamentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
