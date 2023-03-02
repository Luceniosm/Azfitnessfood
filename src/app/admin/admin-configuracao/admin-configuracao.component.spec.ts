import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminConfiguracaoComponent } from './admin-configuracao.component';

describe('AdminConfiguracaoComponent', () => {
  let component: AdminConfiguracaoComponent;
  let fixture: ComponentFixture<AdminConfiguracaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
