import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminConfiguracaoExpedienteComponent } from './admin-configuracao-expediente.component';

describe('AdminConfiguracaoExpedienteComponent', () => {
  let component: AdminConfiguracaoExpedienteComponent;
  let fixture: ComponentFixture<AdminConfiguracaoExpedienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
