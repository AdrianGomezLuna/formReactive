import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReactiComponent } from './form-reacti.component';

describe('FormReactiComponent', () => {
  let component: FormReactiComponent;
  let fixture: ComponentFixture<FormReactiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReactiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReactiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
