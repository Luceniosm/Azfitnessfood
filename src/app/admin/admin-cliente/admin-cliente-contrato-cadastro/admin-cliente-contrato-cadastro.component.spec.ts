import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClienteContratoCadastroComponent } from './admin-cliente-contrato-cadastro.component';

describe('AdminClienteContratoCadastroComponent', () => {
  let component: AdminClienteContratoCadastroComponent;
  let fixture: ComponentFixture<AdminClienteContratoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClienteContratoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClienteContratoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
