import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminConfiguracaoTermoCondicaoCadastroComponent } from './admin-configuracao-termo-condicao-cadastro.component';

describe('AdminConfiguracaoTermoCondicaoCadastroComponent', () => {
  let component: AdminConfiguracaoTermoCondicaoCadastroComponent;
  let fixture: ComponentFixture<AdminConfiguracaoTermoCondicaoCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoTermoCondicaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoTermoCondicaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
