import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundIlustrationComponent } from './background-ilustration.component';

describe('BackgroundIlustrationComponent', () => {
  let component: BackgroundIlustrationComponent;
  let fixture: ComponentFixture<BackgroundIlustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundIlustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundIlustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
