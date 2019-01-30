import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletsComponent } from './applets.component';

describe('AppletsComponent', () => {
  let component: AppletsComponent;
  let fixture: ComponentFixture<AppletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
