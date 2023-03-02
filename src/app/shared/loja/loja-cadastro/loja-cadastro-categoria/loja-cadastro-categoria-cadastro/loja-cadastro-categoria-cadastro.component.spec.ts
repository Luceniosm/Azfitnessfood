import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCadastroCategoriaCadastroComponent } from './loja-cadastro-categoria-cadastro.component';

describe('LojaCadastroCategoriaCadastroComponent', () => {
  let component: LojaCadastroCategoriaCadastroComponent;
  let fixture: ComponentFixture<LojaCadastroCategoriaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCadastroCategoriaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCadastroCategoriaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
