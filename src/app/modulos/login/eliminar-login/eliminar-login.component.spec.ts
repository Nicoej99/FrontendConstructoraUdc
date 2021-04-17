import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLoginComponent } from './eliminar-login.component';

describe('EliminarLoginComponent', () => {
  let component: EliminarLoginComponent;
  let fixture: ComponentFixture<EliminarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
