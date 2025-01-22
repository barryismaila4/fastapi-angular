import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontmagasinComponent } from './frontmagasin.component';

describe('FrontmagasinComponent', () => {
  let component: FrontmagasinComponent;
  let fixture: ComponentFixture<FrontmagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontmagasinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontmagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
