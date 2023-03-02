import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminConfiguracaoTermoCondicaoComponent } from './admin-configuracao-termo-condicao.component';

describe('AdminConfiguracaoTermoCondicaoComponent', () => {
  let component: AdminConfiguracaoTermoCondicaoComponent;
  let fixture: ComponentFixture<AdminConfiguracaoTermoCondicaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfiguracaoTermoCondicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfiguracaoTermoCondicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
