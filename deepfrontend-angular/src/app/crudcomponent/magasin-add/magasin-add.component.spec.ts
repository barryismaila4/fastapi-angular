import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinAddComponent } from './magasin-add.component';

describe('MagasinAddComponent', () => {
  let component: MagasinAddComponent;
  let fixture: ComponentFixture<MagasinAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagasinAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagasinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
