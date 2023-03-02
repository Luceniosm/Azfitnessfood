import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCadastroCategoriaComponent } from './loja-cadastro-categoria.component';

describe('LojaCadastroCategoriaComponent', () => {
  let component: LojaCadastroCategoriaComponent;
  let fixture: ComponentFixture<LojaCadastroCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCadastroCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCadastroCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
