import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginInstallAppIosComponent } from './login-install-app-ios.component';

describe('LoginInstallAppIosComponent', () => {
  let component: LoginInstallAppIosComponent;
  let fixture: ComponentFixture<LoginInstallAppIosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInstallAppIosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInstallAppIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
