import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardEnderecoAlteradoComponent } from './admin-dashboard-endereco-alterado.component';

describe('AdminDashboardEnderecoAlteradoComponent', () => {
  let component: AdminDashboardEnderecoAlteradoComponent;
  let fixture: ComponentFixture<AdminDashboardEnderecoAlteradoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardEnderecoAlteradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardEnderecoAlteradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
