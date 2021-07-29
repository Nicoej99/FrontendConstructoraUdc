import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCiudadComponent } from './informe-ciudad.component';

describe('InformeCiudadComponent', () => {
  let component: InformeCiudadComponent;
  let fixture: ComponentFixture<InformeCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCiudadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
