import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPacoteCategoriaComplementoItemComponent } from './admin-pacote-categoria-complemento-item.component';

describe('AdminPacoteCategoriaComplementoItemComponent', () => {
  let component: AdminPacoteCategoriaComplementoItemComponent;
  let fixture: ComponentFixture<AdminPacoteCategoriaComplementoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPacoteCategoriaComplementoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPacoteCategoriaComplementoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
