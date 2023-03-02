import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardDietaComponent } from './admin-dashboard-dieta.component';

describe('AdminDashboardDietaComponent', () => {
  let component: AdminDashboardDietaComponent;
  let fixture: ComponentFixture<AdminDashboardDietaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
