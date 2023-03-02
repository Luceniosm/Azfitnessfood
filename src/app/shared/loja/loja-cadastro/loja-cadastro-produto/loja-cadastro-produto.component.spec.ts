import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCadastroProdutoComponent } from './loja-cadastro-produto.component';

describe('LojaCadastroProdutoComponent', () => {
  let component: LojaCadastroProdutoComponent;
  let fixture: ComponentFixture<LojaCadastroProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCadastroProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCadastroProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
