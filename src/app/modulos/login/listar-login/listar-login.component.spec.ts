import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLoginComponent } from './listar-login.component';

describe('ListarLoginComponent', () => {
  let component: ListarLoginComponent;
  let fixture: ComponentFixture<ListarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
