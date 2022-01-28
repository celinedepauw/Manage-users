import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassionsContainerComponent } from './passions-container.component';

describe('PassionsContainerComponent', () => {
  let component: PassionsContainerComponent;
  let fixture: ComponentFixture<PassionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassionsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
