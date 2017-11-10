import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FyiComponent } from './fyi.component';

describe('FyiComponent', () => {
  let component: FyiComponent;
  let fixture: ComponentFixture<FyiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FyiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FyiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
