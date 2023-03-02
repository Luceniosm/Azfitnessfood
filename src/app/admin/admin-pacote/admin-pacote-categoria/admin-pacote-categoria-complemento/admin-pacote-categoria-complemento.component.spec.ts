import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminPacoteCategoriaComplementoComponent } from './admin-pacote-categoria-complemento.component';

describe('AdminPacoteCategoriaComplementoComponent', () => {
  let component: AdminPacoteCategoriaComplementoComponent;
  let fixture: ComponentFixture<AdminPacoteCategoriaComplementoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPacoteCategoriaComplementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPacoteCategoriaComplementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
