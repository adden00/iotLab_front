import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalButtonComponent } from './terminal-button.component';

describe('TerminalButtonComponent', () => {
  let component: TerminalButtonComponent;
  let fixture: ComponentFixture<TerminalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
