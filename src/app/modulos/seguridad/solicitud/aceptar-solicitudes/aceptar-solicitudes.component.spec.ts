import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarSolicitudesComponent } from './aceptar-solicitudes.component';

describe('AceptarSolicitudesComponent', () => {
  let component: AceptarSolicitudesComponent;
  let fixture: ComponentFixture<AceptarSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptarSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
