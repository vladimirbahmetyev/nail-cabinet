import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateRecordComponent } from './client-create-record.component';

describe('AddServiceComponent', () => {
  let component: ClientCreateRecordComponent;
  let fixture: ComponentFixture<ClientCreateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCreateRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
