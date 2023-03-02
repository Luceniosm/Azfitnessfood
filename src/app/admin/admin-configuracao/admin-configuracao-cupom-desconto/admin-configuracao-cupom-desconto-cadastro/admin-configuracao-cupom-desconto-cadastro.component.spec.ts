import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracaoCupomDescontoCadastroComponent } from './admin-configuracao-cupom-desconto-cadastro.component';

describe('AdminConfiguracaoCupomDescontoCadastroComponent', () => {
  let component: AdminConfiguracaoCupomDescontoCadastroComponent;
  let fixture: ComponentFixture<AdminConfiguracaoCupomDescontoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoCupomDescontoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoCupomDescontoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
