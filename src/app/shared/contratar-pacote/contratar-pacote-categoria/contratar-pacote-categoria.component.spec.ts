import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarPacoteCategoriaComponent } from './contratar-pacote-categoria.component';

describe('ContratarPacoteCategoriaComponent', () => {
  let component: ContratarPacoteCategoriaComponent;
  let fixture: ComponentFixture<ContratarPacoteCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarPacoteCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarPacoteCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
