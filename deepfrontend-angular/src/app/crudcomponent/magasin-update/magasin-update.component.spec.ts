import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinUpdateComponent } from './magasin-update.component';

describe('MagasinUpdateComponent', () => {
  let component: MagasinUpdateComponent;
  let fixture: ComponentFixture<MagasinUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagasinUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagasinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
