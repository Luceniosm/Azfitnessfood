import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCadastroComponent } from './loja-cadastro.component';

describe('LojaCadastroComponent', () => {
  let component: LojaCadastroComponent;
  let fixture: ComponentFixture<LojaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
