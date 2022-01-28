import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassionComponent } from './add-passion.component';

describe('AddPassionComponent', () => {
  let component: AddPassionComponent;
  let fixture: ComponentFixture<AddPassionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPassionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
