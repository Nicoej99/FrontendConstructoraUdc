import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminiarInmuebleComponent } from './eliminiar-inmueble.component';

describe('EliminiarInmuebleComponent', () => {
  let component: EliminiarInmuebleComponent;
  let fixture: ComponentFixture<EliminiarInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminiarInmuebleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminiarInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
