import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCadastroProdutoCadastroComponent } from './loja-cadastro-produto-cadastro.component';

describe('LojaCadastroProdutoCadastroComponent', () => {
  let component: LojaCadastroProdutoCadastroComponent;
  let fixture: ComponentFixture<LojaCadastroProdutoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCadastroProdutoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCadastroProdutoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
