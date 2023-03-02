import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardPesoComponent } from './admin-dashboard-peso.component';

describe('AdminDashboardPesoComponent', () => {
  let component: AdminDashboardPesoComponent;
  let fixture: ComponentFixture<AdminDashboardPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
