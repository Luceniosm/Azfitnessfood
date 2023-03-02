import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminPacoteCategoriaCadastroComponent } from './admin-pacote-categoria-cadastro.component';

describe('AdminPacoteCategoriaCadastroComponent', () => {
  let component: AdminPacoteCategoriaCadastroComponent;
  let fixture: ComponentFixture<AdminPacoteCategoriaCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPacoteCategoriaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPacoteCategoriaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
