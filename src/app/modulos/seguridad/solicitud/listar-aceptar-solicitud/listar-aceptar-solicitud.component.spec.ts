import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAceptarSolicitudComponent } from './listar-aceptar-solicitud.component';

describe('ListarAceptarSolicitudComponent', () => {
  let component: ListarAceptarSolicitudComponent;
  let fixture: ComponentFixture<ListarAceptarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAceptarSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAceptarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
