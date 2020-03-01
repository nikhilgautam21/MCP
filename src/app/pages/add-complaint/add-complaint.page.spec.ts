import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddComplaintPage } from './add-complaint.page';

describe('AddComplaintPage', () => {
  let component: AddComplaintPage;
  let fixture: ComponentFixture<AddComplaintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplaintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
