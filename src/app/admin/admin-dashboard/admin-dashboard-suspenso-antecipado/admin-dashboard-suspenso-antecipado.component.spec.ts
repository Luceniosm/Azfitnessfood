import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardSuspensoAntecipadoComponent } from './admin-dashboard-suspenso-antecipado.component';

describe('AdminDashboardSuspensoAntecipadoComponent', () => {
  let component: AdminDashboardSuspensoAntecipadoComponent;
  let fixture: ComponentFixture<AdminDashboardSuspensoAntecipadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardSuspensoAntecipadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardSuspensoAntecipadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
