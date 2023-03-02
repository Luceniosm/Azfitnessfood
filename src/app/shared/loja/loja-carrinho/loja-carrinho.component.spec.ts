import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCarrinhoComponent } from './loja-carrinho.component';

describe('LojaCarrinhoComponent', () => {
  let component: LojaCarrinhoComponent;
  let fixture: ComponentFixture<LojaCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCarrinhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
