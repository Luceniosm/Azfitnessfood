import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracaoCupomDescontoComponent } from './admin-configuracao-cupom-desconto.component';

describe('AdminConfiguracaoCupomDescontoComponent', () => {
  let component: AdminConfiguracaoCupomDescontoComponent;
  let fixture: ComponentFixture<AdminConfiguracaoCupomDescontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoCupomDescontoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoCupomDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
