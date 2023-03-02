import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminClienteContratoComponent } from './admin-cliente-contrato.component';

describe('AdminClienteContratoComponent', () => {
  let component: AdminClienteContratoComponent;
  let fixture: ComponentFixture<AdminClienteContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClienteContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClienteContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
