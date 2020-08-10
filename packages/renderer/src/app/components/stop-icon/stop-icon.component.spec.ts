import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopIconComponent } from './stop-icon.component';

describe('StopIconComponent', () => {
  let component: StopIconComponent;
  let fixture: ComponentFixture<StopIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
