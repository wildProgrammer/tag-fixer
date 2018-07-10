import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingModalComponent } from './saving-modal.component';

describe('SavingModalComponent', () => {
  let component: SavingModalComponent;
  let fixture: ComponentFixture<SavingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
