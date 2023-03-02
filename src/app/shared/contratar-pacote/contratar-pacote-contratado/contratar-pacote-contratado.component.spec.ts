import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarPacoteContratadoComponent } from './contratar-pacote-contratado.component';

describe('ContratarPacoteContratadoComponent', () => {
  let component: ContratarPacoteContratadoComponent;
  let fixture: ComponentFixture<ContratarPacoteContratadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarPacoteContratadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarPacoteContratadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
