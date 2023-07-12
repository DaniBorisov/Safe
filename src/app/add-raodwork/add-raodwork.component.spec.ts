import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaodworkComponent } from './add-raodwork.component';

describe('AddRaodworkComponent', () => {
  let component: AddRaodworkComponent;
  let fixture: ComponentFixture<AddRaodworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRaodworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRaodworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
