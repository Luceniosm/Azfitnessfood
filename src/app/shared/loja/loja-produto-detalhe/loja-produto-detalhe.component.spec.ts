import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LojaProdutoDetalheComponent } from './loja-produto-detalhe.component';

describe('LojaProdutoDetalheComponent', () => {
  let component: LojaProdutoDetalheComponent;
  let fixture: ComponentFixture<LojaProdutoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaProdutoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaProdutoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
