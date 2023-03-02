import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntregadorCardapioComponent } from './entregador-cardapio.component';

describe('EntregadorCardapioComponent', () => {
  let component: EntregadorCardapioComponent;
  let fixture: ComponentFixture<EntregadorCardapioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadorCardapioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadorCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
