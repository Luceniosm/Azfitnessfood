import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardInicioTerminoContratacaoComponent } from './admin-dashboard-inicio-termino-contratacao.component';

describe('AdminDashboardInicioTerminoContratacaoComponent', () => {
  let component: AdminDashboardInicioTerminoContratacaoComponent;
  let fixture: ComponentFixture<AdminDashboardInicioTerminoContratacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardInicioTerminoContratacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardInicioTerminoContratacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
