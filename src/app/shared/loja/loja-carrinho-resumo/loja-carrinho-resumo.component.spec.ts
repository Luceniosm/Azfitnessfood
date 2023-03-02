import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCarrinhoResumoComponent } from './loja-carrinho-resumo.component';

describe('LojaCarrinhoResumoComponent', () => {
  let component: LojaCarrinhoResumoComponent;
  let fixture: ComponentFixture<LojaCarrinhoResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCarrinhoResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCarrinhoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
