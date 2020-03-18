import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullImagePage } from './full-image.page';

describe('FullImagePage', () => {
  let component: FullImagePage;
  let fixture: ComponentFixture<FullImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
