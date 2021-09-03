import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicerHeaderComponent } from './nicer-header.component';

describe('NicerHeaderComponent', () => {
  let component: NicerHeaderComponent;
  let fixture: ComponentFixture<NicerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
