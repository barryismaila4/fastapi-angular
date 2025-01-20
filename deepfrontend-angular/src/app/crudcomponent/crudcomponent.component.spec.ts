import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudcomponentComponent } from './crudcomponent.component';

describe('CrudcomponentComponent', () => {
  let component: CrudcomponentComponent;
  let fixture: ComponentFixture<CrudcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
