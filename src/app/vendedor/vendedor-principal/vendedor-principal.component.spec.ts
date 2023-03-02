import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorPrincipalComponent } from './vendedor-principal.component';

describe('VendedorPrincipalComponent', () => {
  let component: VendedorPrincipalComponent;
  let fixture: ComponentFixture<VendedorPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendedorPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
