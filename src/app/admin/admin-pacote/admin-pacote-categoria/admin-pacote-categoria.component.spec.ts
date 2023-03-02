import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminPacoteCategoriaComponent } from './admin-pacote-categoria.component';

describe('AdminPacoteCategoriaComponent', () => {
  let component: AdminPacoteCategoriaComponent;
  let fixture: ComponentFixture<AdminPacoteCategoriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPacoteCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPacoteCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
