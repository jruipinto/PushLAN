import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartIconComponent } from './start-icon.component';

describe('StartIconComponent', () => {
  let component: StartIconComponent;
  let fixture: ComponentFixture<StartIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
