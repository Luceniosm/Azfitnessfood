import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarPacoteComponent } from './contratar-pacote.component';

describe('ContratarPacoteComponent', () => {
  let component: ContratarPacoteComponent;
  let fixture: ComponentFixture<ContratarPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarPacoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
