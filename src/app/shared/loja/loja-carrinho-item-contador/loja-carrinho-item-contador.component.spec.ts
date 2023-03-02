import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCarrinhoItemContadorComponent } from './loja-carrinho-item-contador.component';

describe('LojaCarrinhoItemContadorComponent', () => {
  let component: LojaCarrinhoItemContadorComponent;
  let fixture: ComponentFixture<LojaCarrinhoItemContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCarrinhoItemContadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCarrinhoItemContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
