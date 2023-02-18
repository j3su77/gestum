import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecutoresComponent } from './ejecutores.component';

describe('EjecutoresComponent', () => {
  let component: EjecutoresComponent;
  let fixture: ComponentFixture<EjecutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjecutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjecutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
