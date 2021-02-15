import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DscPrintComponent } from './dsc-print.component';

describe('DscPrintComponent', () => {
  let component: DscPrintComponent;
  let fixture: ComponentFixture<DscPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DscPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DscPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
