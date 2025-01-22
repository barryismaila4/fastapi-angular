import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcommandeComponent } from './frontcommande.component';

describe('FrontcommandeComponent', () => {
  let component: FrontcommandeComponent;
  let fixture: ComponentFixture<FrontcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontcommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
