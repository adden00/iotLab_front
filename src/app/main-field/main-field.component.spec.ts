import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFieldComponent } from './main-field.component';

describe('MainFieldComponent', () => {
  let component: MainFieldComponent;
  let fixture: ComponentFixture<MainFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
