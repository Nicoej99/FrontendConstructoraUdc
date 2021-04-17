import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLoginComponent } from './editar-login.component';

describe('EditarLoginComponent', () => {
  let component: EditarLoginComponent;
  let fixture: ComponentFixture<EditarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
