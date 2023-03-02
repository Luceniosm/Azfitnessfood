import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminClienteDadosPessoaisComponent } from './admin-cliente-dados-pessoais.component';

describe('AdminClienteDadosPessoaisComponent', () => {
  let component: AdminClienteDadosPessoaisComponent;
  let fixture: ComponentFixture<AdminClienteDadosPessoaisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClienteDadosPessoaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClienteDadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
