import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperCreditComponent } from './developer-credit.component';

describe('DeveloperCreditComponent', () => {
  let component: DeveloperCreditComponent;
  let fixture: ComponentFixture<DeveloperCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
