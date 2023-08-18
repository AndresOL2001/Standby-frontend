import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencialesComponent } from './residenciales.component';

describe('ResidencialesComponent', () => {
  let component: ResidencialesComponent;
  let fixture: ComponentFixture<ResidencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
