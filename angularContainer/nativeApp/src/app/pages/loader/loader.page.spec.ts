import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { trendingDown } from 'ionicons/icons';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should go to login page after load', () => {
  //   component.ngOnInit();
  //   expect(false).toBeFalsy();
  // })
});
