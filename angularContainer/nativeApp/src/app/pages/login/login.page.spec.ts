import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imports: [
      ReactiveFormsModule
    ]
  });

  it('should create a form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
